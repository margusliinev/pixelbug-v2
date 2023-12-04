import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get()
    async search(@Query() queryParams: { searchTerm: string }) {
        const { searchResults } = await this.searchService.search(queryParams);
        return { success: true, tickets: searchResults };
    }
}
