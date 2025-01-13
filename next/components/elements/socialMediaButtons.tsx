import React from 'react';
import { FaFacebook, FaInstagram, FaTelegram, FaLinkedin, FaYoutube, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { NostrIcon } from '@/components/icons/illustrations';

// Map icons to their respective platforms
const iconMap = {
  Facebook: <FaFacebook size={21} />,
  Instagram: <FaInstagram size={21} />,
  Telegram: <FaTelegram size={21} />,
  LinkedIn: <FaLinkedin size={21} />,
  YouTube: <FaYoutube size={21} />,
  X: <FaTwitter size={21} />,
  Email: <FaEnvelope size={21} />,
  Nostr: <NostrIcon className='' size={21} color="currentColor" />,
};

type SocialPlatform = keyof typeof iconMap;

interface SocialMediaItem {
  platform: string;
  link: Array<{ URL: string }>;
}

interface SocialMediaButtonsProps {
  socialMedia: SocialMediaItem[];
}

const SocialMediaButtons: React.FC<SocialMediaButtonsProps> = ({ socialMedia }) => {
  return (
    <div className="flex space-x-2">
      {socialMedia.map((item, index) => {
        const platform = item.platform as SocialPlatform;
        const link = item.link?.[0]?.URL || '#';

        if (!(platform in iconMap)) {
          return null; // Skip if the platform is not in iconMap
        }

        return (
          <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
            {iconMap[platform]}
          </a>
        );
      })}
    </div>
  );
};

export default SocialMediaButtons;
