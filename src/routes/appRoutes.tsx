import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CharacterList from '../pages/characterList';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CharacterList />} />
    </Routes>
  );
};

export default AppRoutes;
