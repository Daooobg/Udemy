import _ from 'lodash';   //js library

import { ProjectInput } from './components/project-input';
import { ProjectList } from './components/project-list';

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');

console.log(_.shuffle([1, 2, 3]));
