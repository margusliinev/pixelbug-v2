import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'If you see this message then your backend and frontend are connected correctly!';
    }
}
