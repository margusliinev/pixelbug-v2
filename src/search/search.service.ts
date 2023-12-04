import { BadRequestException, Injectable } from '@nestjs/common';
import { Ticket } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SearchService {
    constructor(private readonly prisma: PrismaService) {}

    async search(queryParams: { searchTerm: string }) {
        console.log(queryParams.searchTerm);
        if (typeof queryParams.searchTerm !== 'string') {
            throw new BadRequestException({ success: false, message: 'Invalid search term', status: 400, fields: null });
        }
        const searchResults: Ticket[] = await this.prisma.$queryRawUnsafe(
            'SELECT id, title FROM "tickets" WHERE (title ILIKE $1) limit 12',
            `%${queryParams.searchTerm}%`,
        );

        return { searchResults };
    }
}
