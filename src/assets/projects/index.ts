import createAiPuzzleGame, { content as aiPuzzleGameContent } from "./ai-puzzle-game";
import createAlgorithmPerformanceBenchmarker, {
  content as algorithmPerformanceBenchmarkerContent
} from "./algorithm-performance-benchmarker";
import createCapyMorph, { content as capyMorphContent } from "./capymorph";
import createClarityCash, { content as clarityCashContent } from "./clarity-cash";
import createComputerVisionChickCounting, {
  content as computerVisionChickCountingContent
} from "./computer-vision-chick-counting";
import createDataScienceStuff, { content as dataScienceStuffContent } from "./data-science-stuff";
import createEncryptedP2pChatroom, { content as encryptedP2pChatroomContent } from "./encrypted-p2p-chatroom";
import createKnowYourUni, { content as knowYourUniContent } from "./know-your-uni";
import createLunara, { content as lunaraContent } from "./lunara";
import createMove4WellnessFitnessApp, {
  content as move4WellnessFitnessAppContent
} from "./move4wellness-fitness-app";
import createParallelQueryProcessingSystem, {
  content as parallelQueryProcessingSystemContent
} from "./parallel-query-processing-system";
import createPerishLess, { content as perishLessContent } from "./perishless";
import createPortfolioWebsite, { content as portfolioWebsiteContent } from "./portfolio-website";
import createPoultryFarmDataAnalyticsDashboard, {
  content as poultryFarmDataAnalyticsDashboardContent
} from "./poultry-farm-data-analytics-dashboard";
import createRova, { content as rovaContent } from "./rova";
import createShakespeareanPersonalityLlmAugmentation, {
  content as shakespeareanPersonalityLlmAugmentationContent
} from "./shakespearean-personality-llm-augmentation";
import createStockPortfolioManagementSystem, {
  content as stockPortfolioManagementSystemContent
} from "./stock-portfolio-management-system";
import createTestifAi, { content as testifAiContent } from "./testifai";
import createVaultAssistant, { content as vaultAssistantContent } from "./vault-assistant";
import type { ProjectPageExtra } from "./page-content";
import type { ProjectItem } from "./project-item";

export { personImageAlt, projectImageAlt } from "./image-alt";
export { aboutPlaceholders, projectPage } from "./page-content";
export type { ProjectPageExtra, ProjectSection } from "./page-content";
export { ProjectItem } from "./project-item";

const PROJECT_FACTORIES = [
  createLunara,
  createTestifAi,
  createCapyMorph,
  createPerishLess,
  createComputerVisionChickCounting,
  createParallelQueryProcessingSystem,
  createClarityCash,
  createKnowYourUni,
  createStockPortfolioManagementSystem,
  createEncryptedP2pChatroom,
  createDataScienceStuff,
  createAiPuzzleGame,
  createAlgorithmPerformanceBenchmarker,
  createMove4WellnessFitnessApp,
  createPortfolioWebsite,
  createShakespeareanPersonalityLlmAugmentation,
  createPoultryFarmDataAnalyticsDashboard,
  createVaultAssistant,
  createRova
];

export const projectContent: Record<string, ProjectPageExtra> = {
  lunara: lunaraContent,
  testifai: testifAiContent,
  capymorph: capyMorphContent,
  perishless: perishLessContent,
  "computer-vision-chick-counting": computerVisionChickCountingContent,
  "parallel-query-processing-system": parallelQueryProcessingSystemContent,
  claritycash: clarityCashContent,
  knowyouruni: knowYourUniContent,
  "stock-portfolio-management-system": stockPortfolioManagementSystemContent,
  "encrypted-p2p-chatroom": encryptedP2pChatroomContent,
  "data-science-stuff": dataScienceStuffContent,
  "ai-puzzle-game": aiPuzzleGameContent,
  "algorithm-performance-benchmarker": algorithmPerformanceBenchmarkerContent,
  "move4wellness-fitness-app": move4WellnessFitnessAppContent,
  "portfolio-website": portfolioWebsiteContent,
  "shakespearean-personality-llm-augmentation": shakespeareanPersonalityLlmAugmentationContent,
  "poultry-farm-data-analytics-dashboard": poultryFarmDataAnalyticsDashboardContent,
  "vault-assistant": vaultAssistantContent,
  rova: rovaContent
};

export function getProjectItems(): ProjectItem[] {
  return PROJECT_FACTORIES.map(createProject => createProject());
}
