import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import FavoriteResources from './components/AddResource';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
<BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/favorites" component={FavoriteResources} />
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
