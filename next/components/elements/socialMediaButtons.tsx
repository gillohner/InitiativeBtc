import React from 'react';
import { FaFacebook, FaInstagram, FaTelegram, FaLinkedin, FaYoutube, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { NostrIcon } from '@/components/icons/illustrations';

const iconMap = {
  Facebook: FaFacebook,
  Instagram: FaInstagram,
  Telegram: FaTelegram,
  Linkedin: FaLinkedin,
  YouTube: FaYoutube,
  X: FaTwitter,
  Email: FaEnvelope,
  Nostr: NostrIcon,
};

type SocialPlatform = keyof typeof iconMap;

interface SocialMediaItem {
  platform: string;
  icon: string;
  link: { URL: string };
}

interface SocialMediaButtonsProps {
  socialMedia: SocialMediaItem[];
}

const SocialMediaButtons: React.FC<SocialMediaButtonsProps> = ({ socialMedia }) => {
  return (
    <div className="flex space-x-2 mt-4">
      {socialMedia.map((item, index) => {
        const platform = item.icon as SocialPlatform;
        const link = item.link?.URL || ''; // Access the first item in the array

        if (!(platform in iconMap)) {
          return null;
        }

        const Icon = iconMap[platform];

        return (
          <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
            <Icon size={21} color={""} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialMediaButtons;
