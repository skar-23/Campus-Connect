import React from 'react';
import { maleAvatars, femaleAvatars, getUserAvatar } from '@/utils/avatarUtils';

const AvatarTest: React.FC = () => {
  const testUserId = 'test-user-123';
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Avatar System Test</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Male Avatars:</h3>
        <div className="flex flex-wrap gap-4">
          {maleAvatars.map((avatar) => (
            <div key={avatar.id} className="text-center">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 mb-2">
                <img 
                  src={avatar.url} 
                  alt={avatar.name}
                  className="w-full h-full object-cover"
                  onLoad={() => console.log(`✅ Male avatar loaded: ${avatar.id}`)}
                  onError={(e) => {
                    console.error(`❌ Failed to load male avatar: ${avatar.id}`, e);
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'w-full h-full bg-red-500 flex items-center justify-center text-white text-sm font-bold';
                    fallback.textContent = '❌';
                    target.parentElement?.appendChild(fallback);
                  }}
                />
              </div>
              <p className="text-xs text-gray-600">{avatar.name}</p>
              <p className="text-xs text-blue-600">{avatar.id}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Female Avatars:</h3>
        <div className="flex flex-wrap gap-4">
          {femaleAvatars.map((avatar) => (
            <div key={avatar.id} className="text-center">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 mb-2">
                <img 
                  src={avatar.url} 
                  alt={avatar.name}
                  className="w-full h-full object-cover"
                  onLoad={() => console.log(`✅ Female avatar loaded: ${avatar.id}`)}
                  onError={(e) => {
                    console.error(`❌ Failed to load female avatar: ${avatar.id}`, e);
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'w-full h-full bg-red-500 flex items-center justify-center text-white text-sm font-bold';
                    fallback.textContent = '❌';
                    target.parentElement?.appendChild(fallback);
                  }}
                />
              </div>
              <p className="text-xs text-gray-600">{avatar.name}</p>
              <p className="text-xs text-blue-600">{avatar.id}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">getUserAvatar Test:</h3>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => {
            const avatar = getUserAvatar(testUserId, 'male');
            console.log('Male avatar test:', avatar);
          }}
        >
          Test Male Avatar
        </button>
        <button 
          className="bg-pink-500 text-white px-4 py-2 rounded"
          onClick={() => {
            const avatar = getUserAvatar(testUserId, 'female');
            console.log('Female avatar test:', avatar);
          }}
        >
          Test Female Avatar
        </button>
      </div>

      <div className="text-sm text-gray-600">
        <p><strong>Note:</strong> Check browser console for detailed loading results</p>
      </div>
    </div>
  );
};

export default AvatarTest;
