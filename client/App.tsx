import React from 'react';
import { Route, Switch } from 'wouter';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Villas } from './pages/Villas';
import { Yachts } from './pages/Yachts';
import { Adventures } from './pages/Adventures';
import { Restaurants } from './pages/Restaurants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/villas" component={Villas} />
        <Route path="/yachts" component={Yachts} />
        <Route path="/adventures" component={Adventures} />
        <Route path="/restaurants" component={Restaurants} />
        {/* Add more routes as we create the components */}
        <Route>
          {/* 404 Page */}
          <div className="min-h-screen">
            <Navigation />
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
              <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-8">Page not found</p>
              <a
                href="/"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Go Home
              </a>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default App; 