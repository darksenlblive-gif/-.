
import React from 'react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { name: 'Главная', icon: '🏠' },
    { name: 'Shorts', icon: '🎞️' },
    { name: 'Подписки', icon: '📺' },
    { name: 'Библиотека', icon: '📚' },
    { name: 'История', icon: '🕒' },
    { name: 'Ваши видео', icon: '📽️' },
  ];

  return (
    <aside className="w-64 glass-panel h-[calc(100vh-80px)] sticky top-20 rounded-3xl m-4 p-4 hidden lg:block transition-all duration-300">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className="w-full flex items-center space-x-4 px-4 py-3 rounded-2xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </nav>
      <div className="mt-8 pt-8 border-t border-white/10">
        <h3 className="px-4 text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Подписки</h3>
        <div className="space-y-2">
           {['Ян Топлес', 'Маслеников', 'Holdik', 'Mono'].map(name => (
             <div key={name} className="flex items-center space-x-3 px-4 py-2 hover:bg-white/5 rounded-xl cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 border border-white/20"></div>
                <span className="text-sm text-white/80">{name}</span>
             </div>
           ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
