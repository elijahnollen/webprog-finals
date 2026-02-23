import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class AppController {
  @Get()
  health() {
    return {
      status: "ok",
      service: "guestbook-backend",
      timestamp: new Date().toISOString()
    };
  }
}
