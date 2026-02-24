import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { GuestbookModule } from "./guestbook/guestbook.module";

@Module({
  imports: [GuestbookModule],
  controllers: [AppController]
})
export class AppModule {}
