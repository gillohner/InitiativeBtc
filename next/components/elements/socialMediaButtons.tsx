import React from 'react';
import { FaFacebook, FaInstagram, FaTelegram, FaLinkedin, FaYoutube, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { NostrIcon } from '@/components/icons/illustrations';

const SocialMediaButtons = ({ socialMedia }) => {
  if (!socialMedia || socialMedia.length === 0) {
    return null; // Handle empty or missing social media data gracefully
  }

  // Map icons to their respective platforms
  const iconMap = {
    Facebook: <FaFacebook size={21} />,
    Instagram: <FaInstagram size={21} />,
    Telegram: <FaTelegram size={21} />,
    LinkedIn: <FaLinkedin size={21} />,
    YouTube: <FaYoutube size={21} />,
    X: <FaTwitter size={21} />,
    Email: <FaEnvelope size={21} />,
    Nostr: <NostrIcon />,
  };

  return (
    <div className="flex space-x-4 mt-4">
      {socialMedia.map((item, index) => {
        const platform = item.icon; // e.g., "Facebook", "Instagram"
        const link = item.link?.[0]?.URL || '#'; // Default to "#" if no URL is provided

        if (!iconMap[platform]) {
          return null; // Skip if the platform is not mapped
        }

        return (
          <a key={index} href={link} target="_blank" rel="noopener noreferrer">
            {iconMap[platform]}
          </a>
        );
      })}
    </div>
  );
};

export default SocialMediaButtons;
