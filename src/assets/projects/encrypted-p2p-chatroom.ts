import { ProjectItem } from "./project-item";
import type { ProjectPageExtra } from "./page-content";

export const content: ProjectPageExtra = {
  tags: "cryptography / networking",
  about: [
    "The Encrypted P2P Chatroom is a terminal-based Python chat application for machines on the same local network. There is no central server. Each peer joins an IPv4 UDP multicast group, runs a listener for incoming packets, announces itself periodically, and sends messages directly to the group.",
    "I built it to work through applied cryptography and peer discovery in a small, inspectable protocol. JOIN packets advertise a username and public key, CHAT packets carry encrypted signed messages, and LEAVE packets tell the group when a peer exits."
  ],
  sections: [
    {
      label: "security model",
      body: [
        "ChaCha20-Poly1305 provides authenticated encryption for message payloads, and Ed25519 signatures let recipients verify the sender. Peers cache the public keys announced during discovery and use them when a chat packet arrives.",
        "This is a learning prototype, not production-secure messaging. Every peer shares one symmetric key, LEAVE messages are plaintext, and Python pickle is used for serialization. Those shortcuts make a LAN demo easy to follow, but they are exactly what I would replace before trusting the protocol with real messages."
      ]
    }
  ]
};

export default function createEncryptedP2pChatroom(): ProjectItem {
  return new ProjectItem(
    "Encrypted P2P Chatroom",
    "Peer-to-peer chat application with end-to-end encryption for secure communication. Uses ChaCha20-Poly1305 for message encryption, Ed25519 message signatures for user validation, and UDP multicast.",
    "https://github.com/Jairik/Secure-P2P-Chatroom",
    ["Cryptography", "WebSockets", "DearPyGUI"],
    "April 2025",
    [
      "/projects/P2P-Encrypted-Chatroom-1.png",
      "/projects/P2P-Encrypted-Chatroom-2.png",
      "/projects/P2P-Encrypted-Chatroom-3.png"
    ],
    "",
    "",
    false
  );
}
