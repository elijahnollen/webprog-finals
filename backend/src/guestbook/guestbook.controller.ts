import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateGuestbookEntryDto } from "./dto/create-guestbook-entry.dto";
import { GuestbookService } from "./guestbook.service";

@Controller("guestbook")
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get()
  async getEntries() {
    return await this.guestbookService.findAll();
  }

  @Post()
  async createEntry(@Body() payload: CreateGuestbookEntryDto) {
    return await this.guestbookService.create(payload);
  }
}
