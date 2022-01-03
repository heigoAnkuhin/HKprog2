
import app from './app';
import { port } from './components/general/settings';

app.listen(port, () => {
  console.log('Server is running');
});
