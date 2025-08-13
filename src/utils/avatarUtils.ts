// Avatar utility functions for Bitmoji-like avatar system

export interface AvatarData {
  id: string;
  name: string;
  gender: 'male' | 'female';
  url: string;
}

// Male Bitmoji-style avatars (using local images)
export const maleAvatars: AvatarData[] = [
  {
    id: 'male-default',
    name: 'Default Boy',
    gender: 'male',
    url: '/lovable-uploads/boys/default.jpeg'
  },
  {
    id: 'male-chill',
    name: 'Chill Guy',
    gender: 'male',
    url: '/lovable-uploads/boys/chill guy.jpeg'
  },
  {
    id: 'male-habibi',
    name: 'Habibi',
    gender: 'male',
    url: '/lovable-uploads/boys/habibi.jpeg'
  },
  {
    id: 'male-habibi-black',
    name: 'Habibi Black',
    gender: 'male',
    url: '/lovable-uploads/boys/habibi black.jpeg'
  },
  {
    id: 'male-lazy',
    name: 'Lazy Guy',
    gender: 'male',
    url: '/lovable-uploads/boys/lazy.jpeg'
  }
];

// Female Bitmoji-style avatars (using local images)
export const femaleAvatars: AvatarData[] = [
  {
    id: 'female-default',
    name: 'Default Girl',
    gender: 'female',
    url: '/lovable-uploads/girls/default.jpeg'
  },
  {
    id: 'female-1',
    name: 'Cool Girl 1',
    gender: 'female',
    url: '/lovable-uploads/girls/girl 1.jpeg'
  },
  {
    id: 'female-2',
    name: 'Cool Girl 2',
    gender: 'female',
    url: '/lovable-uploads/girls/girl 2.jpeg'
  }
];

// Utility functions
export function getRandomAvatar(gender: 'male' | 'female'): AvatarData {
  const avatars = gender === 'male' ? maleAvatars : femaleAvatars;
  const randomIndex = Math.floor(Math.random() * avatars.length);
  return avatars[randomIndex];
}

export function getAvatarsByGender(gender: 'male' | 'female'): AvatarData[] {
  return gender === 'male' ? maleAvatars : femaleAvatars;
}

export function getAvatarById(id: string): AvatarData | undefined {
  const allAvatars = [...maleAvatars, ...femaleAvatars];
  return allAvatars.find(avatar => avatar.id === id);
}

export function assignRandomAvatarOnSignup(gender: 'male' | 'female', userId: string): string {
  // This would typically save to database
  const avatar = getRandomAvatar(gender);
  // In a real app, you'd save this to the user's profile
  // For now, we'll use localStorage as a demo
  localStorage.setItem(`user-avatar-${userId}`, avatar.id);
  return avatar.id;
}

export function getUserAvatar(userId: string, gender: 'male' | 'female'): AvatarData {
  // Try to get saved avatar first
  const savedAvatarId = localStorage.getItem(`user-avatar-${userId}`);
  if (savedAvatarId) {
    const avatar = getAvatarById(savedAvatarId);
    if (avatar) return avatar;
  }
  
  // Fallback to random avatar
  return getRandomAvatar(gender);
}

export function updateUserAvatar(userId: string, avatarId: string): boolean {
  try {
    localStorage.setItem(`user-avatar-${userId}`, avatarId);
    return true;
  } catch {
    return false;
  }
}

// Name-based gender detection (simple heuristic for demo)
export function detectGenderFromName(name: string): 'male' | 'female' {
  const femaleNames = [
    'priya', 'sneha', 'ananya', 'manpreet', 'kaur', 'devi', 'kumari', 'rani', 'maya', 'sita',
    'radha', 'gita', 'meera', 'pooja', 'kavya', 'divya', 'shreya', 'anjali', 'preeti', 'neha',
    'anna', 'bella', 'chloe', 'diana', 'emma', 'fiona', 'grace', 'hannah', 'ivy', 'jade'
  ];
  
  const lowerName = name.toLowerCase();
  const hasFemaleName = femaleNames.some(femaleName => 
    lowerName.includes(femaleName)
  );
  
  return hasFemaleName ? 'female' : 'male';
}

// Senior-specific avatar functions
export function getDefaultAvatar(gender: 'male' | 'female'): string {
  return gender === 'male' 
    ? '/lovable-uploads/boys/default.jpeg'
    : '/lovable-uploads/girls/default.jpeg';
}

export function getAvatarFromPath(avatarPath: string): AvatarData | null {
  if (!avatarPath) return null;
  
  // Try to find avatar by URL
  const allAvatars = [...maleAvatars, ...femaleAvatars];
  const avatar = allAvatars.find(avatar => avatar.url === avatarPath);
  
  if (avatar) {
    return avatar;
  }
  
  // If not found in predefined avatars, create a generic one
  const fileName = avatarPath.split('/').pop() || 'Unknown';
  const isGirl = avatarPath.includes('/girls/');
  
  return {
    id: avatarPath,
    name: fileName.replace('.jpeg', '').replace('.jpg', '').replace('.png', ''),
    gender: isGirl ? 'female' : 'male',
    url: avatarPath
  };
}

export function assignDefaultAvatarForSenior(gender: 'male' | 'female'): string {
  return getDefaultAvatar(gender);
}
