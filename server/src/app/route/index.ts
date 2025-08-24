import { Router } from 'express';
import { AiRoutes } from '../modules/Ai/ai.routes.js';

const routes = Router();

type TRoute = {
  path: string;
  route: Router;
};

const moduleRoutes: TRoute[] = [
  {
    path: '/ai',
    route: AiRoutes,
  },
];

moduleRoutes.forEach(route => {
  routes.use(route.path, route.route);
});

export default routes;
