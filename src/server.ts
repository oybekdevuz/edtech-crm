import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { AdminRoute } from '@/routes/admin.route';
import { ValidateEnv } from '@utils/validateEnv';
import { StudentRoute } from './routes/student.route';

ValidateEnv();

const app = new App([new AuthRoute(), new AdminRoute(), new StudentRoute()]);

app.listen();
