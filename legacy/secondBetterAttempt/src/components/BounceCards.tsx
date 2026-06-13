import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import './BounceCards.css';

type BounceCardImage =
  | string
  | {
      src: string;
      alt?: string;
    };

interface BounceCardsProps {
  className?: string;
  images?: BounceCardImage[];
  containerWidth?: number;
  containerHeight?: number;
  cardWidth?: number;
  cardAspectRatio?: string;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
  onCardHover?: (index: number | null) => void;
}

const normalizeImage = (image: BounceCardImage) =>
  typeof image === 'string' ? { src: image, alt: '' } : image;

const DEFAULT_TRANSFORMS = [
  'rotate(10deg) translate(-170px)',
  'rotate(5deg) translate(-85px)',
  'rotate(-3deg)',
  'rotate(-10deg) translate(85px)',
  'rotate(2deg) translate(170px)'
];

export default function BounceCards({
  className = '',
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  cardWidth = 190,
  cardAspectRatio = '4 / 5',
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = DEFAULT_TRANSFORMS,
  enableHover = true,
  onCardHover
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageItems = useMemo(() => images.map(normalizeImage), [images]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bounce-card',
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [animationStagger, easeType, animationDelay]);

  const getNoRotationTransform = (transformStr: string) => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    }

    return transformStr === 'none' ? 'rotate(0deg)' : `${transformStr} rotate(0deg)`;
  };

  const getPushedTransform = (baseTransform: string, offsetX: number) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);

    if (match) {
      const currentX = parseFloat(match[1]);
      const nextX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${nextX}px)`);
    }

    return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`;
  };

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover || !containerRef.current) return;

    const querySelector = gsap.utils.selector(containerRef);

    imageItems.forEach((_, index) => {
      const target = querySelector(`.bounce-card-${index}`);
      gsap.killTweensOf(target);

      const baseTransform = transformStyles[index] || 'none';

      if (index === hoveredIdx) {
        gsap.to(target, {
          transform: getNoRotationTransform(baseTransform),
          duration: 0.4,
          ease: 'back.out(1.4)',
          overwrite: 'auto'
        });
        return;
      }

      const offsetX = index < hoveredIdx ? -160 : 160;
      const pushedTransform = getPushedTransform(baseTransform, offsetX);
      const delay = Math.abs(hoveredIdx - index) * 0.05;

      gsap.to(target, {
        transform: pushedTransform,
        duration: 0.4,
        ease: 'back.out(1.4)',
        delay,
        overwrite: 'auto'
      });
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;

    const querySelector = gsap.utils.selector(containerRef);

    imageItems.forEach((_, index) => {
      const target = querySelector(`.bounce-card-${index}`);
      gsap.killTweensOf(target);

      gsap.to(target, {
        transform: transformStyles[index] || 'none',
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto'
      });
    });
  };

  return (
    <div
      className={`bounceCardsContainer ${className}`}
      ref={containerRef}
      style={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight
      }}
      onMouseLeave={() => {
        resetSiblings();
        onCardHover?.(null);
      }}
    >
      {imageItems.map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          className={`bounce-card bounce-card-${index}`}
          style={{
            transform: transformStyles[index] ?? 'none',
            width: cardWidth,
            aspectRatio: cardAspectRatio
          }}
          onMouseEnter={() => {
            pushSiblings(index);
            onCardHover?.(index);
          }}
        >
          <img className="bounce-card-image" src={image.src} alt={image.alt || `card-${index}`} loading="lazy" />
        </div>
      ))}
    </div>
  );
}
