import { App } from '@/app';
import { AuthRoute } from '@/routes/auth.route';
import { AdminRoute } from '@/routes/admin.route';
import { ValidateEnv } from './utils/validateEnv';
import { StudentRoute } from './routes/student.route';
import { CourseRoute } from './routes/course.route';
import { StatisticsRoute } from './routes/statistics.route';
import 'module-alias/register';

ValidateEnv();

const app = new App([new AuthRoute(), new AdminRoute(), new StudentRoute(), new CourseRoute(), new StatisticsRoute()]);

app.listen();
