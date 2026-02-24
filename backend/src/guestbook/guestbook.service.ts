import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { CreateGuestbookEntryDto } from "./dto/create-guestbook-entry.dto";
import { GuestbookEntry } from "./models/guestbook-entry.model";

interface GuestbookRow {
  id: string;
  name: string;
  message: string;
  sticker: string | null;
  created_at: string;
}

@Injectable()
export class GuestbookService {
  private readonly supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL?.trim();
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variable.");
    }

    this.supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
  }

  async findAll(): Promise<GuestbookEntry[]> {
    const { data, error } = await this.supabase
      .from("guestbook_entries")
      .select("id,name,message,sticker,created_at")
      .order("created_at", { ascending: false });

    if (error) {
      throw new InternalServerErrorException(`Failed to load guestbook entries: ${error.message}`);
    }

    return (data ?? []).map((entry) => this.toEntry(entry as GuestbookRow));
  }

  async create(payload: CreateGuestbookEntryDto): Promise<GuestbookEntry> {
    const name = payload.name?.trim();
    const message = payload.message?.trim();
    const sticker = payload.sticker?.trim() || null;

    if (!name || !message) {
      throw new BadRequestException("Name and message are required.");
    }

    const { data, error } = await this.supabase
      .from("guestbook_entries")
      .insert({
        name,
        message,
        sticker
      })
      .select("id,name,message,sticker,created_at")
      .single();

    if (error || !data) {
      throw new InternalServerErrorException(`Failed to create guestbook entry: ${error?.message ?? "Unknown error"}`);
    }

    return this.toEntry(data as GuestbookRow);
  }

  private toEntry(row: GuestbookRow): GuestbookEntry {
    return {
      id: row.id,
      name: row.name,
      message: row.message,
      sticker: row.sticker ?? null,
      createdAt: row.created_at
    };
  }
}
