export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      donations: {
        Row: {
          created_at: string
          current_amount: number | null
          description: string | null
          donation_type: Database["public"]["Enums"]["donation_type"]
          donor_id: string | null
          id: string
          items: string[] | null
          senior_id: string
          status: Database["public"]["Enums"]["donation_status"]
          target_amount: number | null
          title: string
          updated_at: string
          urgency: string | null
        }
        Insert: {
          created_at?: string
          current_amount?: number | null
          description?: string | null
          donation_type: Database["public"]["Enums"]["donation_type"]
          donor_id?: string | null
          id?: string
          items?: string[] | null
          senior_id: string
          status?: Database["public"]["Enums"]["donation_status"]
          target_amount?: number | null
          title: string
          updated_at?: string
          urgency?: string | null
        }
        Update: {
          created_at?: string
          current_amount?: number | null
          description?: string | null
          donation_type?: Database["public"]["Enums"]["donation_type"]
          donor_id?: string | null
          id?: string
          items?: string[] | null
          senior_id?: string
          status?: Database["public"]["Enums"]["donation_status"]
          target_amount?: number | null
          title?: string
          updated_at?: string
          urgency?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_senior_id_fkey"
            columns: ["senior_id"]
            isOneToOne: false
            referencedRelation: "senior_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      emergency_alerts: {
        Row: {
          alert_type: string
          created_at: string
          id: string
          location_lat: number | null
          location_lng: number | null
          message: string | null
          resolved_at: string | null
          responded_by: string | null
          senior_id: string
          status: Database["public"]["Enums"]["alert_status"]
        }
        Insert: {
          alert_type: string
          created_at?: string
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          message?: string | null
          resolved_at?: string | null
          responded_by?: string | null
          senior_id: string
          status?: Database["public"]["Enums"]["alert_status"]
        }
        Update: {
          alert_type?: string
          created_at?: string
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          message?: string | null
          resolved_at?: string | null
          responded_by?: string | null
          senior_id?: string
          status?: Database["public"]["Enums"]["alert_status"]
        }
        Relationships: [
          {
            foreignKeyName: "emergency_alerts_responded_by_fkey"
            columns: ["responded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emergency_alerts_senior_id_fkey"
            columns: ["senior_id"]
            isOneToOne: false
            referencedRelation: "senior_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      event_participants: {
        Row: {
          event_id: string
          id: string
          registered_at: string
          user_id: string
        }
        Insert: {
          event_id: string
          id?: string
          registered_at?: string
          user_id: string
        }
        Update: {
          event_id?: string
          id?: string
          registered_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_participants_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          created_by: string | null
          current_participants: number | null
          description: string | null
          event_date: string
          id: string
          location: string | null
          max_participants: number | null
          status: Database["public"]["Enums"]["event_status"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          current_participants?: number | null
          description?: string | null
          event_date: string
          id?: string
          location?: string | null
          max_participants?: number | null
          status?: Database["public"]["Enums"]["event_status"]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          current_participants?: number | null
          description?: string | null
          event_date?: string
          id?: string
          location?: string | null
          max_participants?: number | null
          status?: Database["public"]["Enums"]["event_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      location_tracking: {
        Row: {
          completed_at: string | null
          current_lat: number | null
          current_lng: number | null
          destination_lat: number | null
          destination_lng: number | null
          eta_minutes: number | null
          id: string
          senior_id: string
          started_at: string
          task_id: string
          transport_mode: Database["public"]["Enums"]["transport_mode"] | null
          volunteer_id: string
        }
        Insert: {
          completed_at?: string | null
          current_lat?: number | null
          current_lng?: number | null
          destination_lat?: number | null
          destination_lng?: number | null
          eta_minutes?: number | null
          id?: string
          senior_id: string
          started_at?: string
          task_id: string
          transport_mode?: Database["public"]["Enums"]["transport_mode"] | null
          volunteer_id: string
        }
        Update: {
          completed_at?: string | null
          current_lat?: number | null
          current_lng?: number | null
          destination_lat?: number | null
          destination_lng?: number | null
          eta_minutes?: number | null
          id?: string
          senior_id?: string
          started_at?: string
          task_id?: string
          transport_mode?: Database["public"]["Enums"]["transport_mode"] | null
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "location_tracking_senior_id_fkey"
            columns: ["senior_id"]
            isOneToOne: false
            referencedRelation: "senior_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "location_tracking_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "location_tracking_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteer_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          image_url: string | null
          location_lat: number | null
          location_lng: number | null
          message_type: Database["public"]["Enums"]["message_type"]
          read: boolean | null
          recipient_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          location_lat?: number | null
          location_lng?: number | null
          message_type?: Database["public"]["Enums"]["message_type"]
          read?: boolean | null
          recipient_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          location_lat?: number | null
          location_lng?: number | null
          message_type?: Database["public"]["Enums"]["message_type"]
          read?: boolean | null
          recipient_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      senior_profiles: {
        Row: {
          created_at: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          id: string
          medical_conditions: string | null
          mobility_level: string | null
          preferred_volunteer_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          id?: string
          medical_conditions?: string | null
          mobility_level?: string | null
          preferred_volunteer_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          id?: string
          medical_conditions?: string | null
          mobility_level?: string | null
          preferred_volunteer_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "senior_profiles_preferred_volunteer_id_fkey"
            columns: ["preferred_volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteer_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "senior_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          completed_date: string | null
          created_at: string
          description: string | null
          id: string
          location: string | null
          notes: string | null
          priority: Database["public"]["Enums"]["task_priority"]
          scheduled_date: string | null
          senior_id: string
          status: Database["public"]["Enums"]["task_status"]
          task_type: Database["public"]["Enums"]["task_type"]
          title: string
          updated_at: string
          volunteer_id: string | null
        }
        Insert: {
          completed_date?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          priority?: Database["public"]["Enums"]["task_priority"]
          scheduled_date?: string | null
          senior_id: string
          status?: Database["public"]["Enums"]["task_status"]
          task_type: Database["public"]["Enums"]["task_type"]
          title: string
          updated_at?: string
          volunteer_id?: string | null
        }
        Update: {
          completed_date?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          priority?: Database["public"]["Enums"]["task_priority"]
          scheduled_date?: string | null
          senior_id?: string
          status?: Database["public"]["Enums"]["task_status"]
          task_type?: Database["public"]["Enums"]["task_type"]
          title?: string
          updated_at?: string
          volunteer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_senior_id_fkey"
            columns: ["senior_id"]
            isOneToOne: false
            referencedRelation: "senior_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "tasks_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteer_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_profiles: {
        Row: {
          active_tasks: number | null
          availability: string | null
          badges: string[] | null
          created_at: string
          id: string
          points: number | null
          rating: number | null
          skills: string[] | null
          total_tasks: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          active_tasks?: number | null
          availability?: string | null
          badges?: string[] | null
          created_at?: string
          id?: string
          points?: number | null
          rating?: number | null
          skills?: string[] | null
          total_tasks?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          active_tasks?: number | null
          availability?: string | null
          badges?: string[] | null
          created_at?: string
          id?: string
          points?: number | null
          rating?: number | null
          skills?: string[] | null
          total_tasks?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      alert_status: "active" | "resolved" | "cancelled"
      app_role: "admin" | "volunteer" | "senior"
      donation_status: "pending" | "approved" | "received" | "cancelled"
      donation_type: "financial" | "items"
      event_status: "upcoming" | "ongoing" | "completed" | "cancelled"
      message_type: "text" | "image" | "video" | "location"
      task_priority: "low" | "medium" | "high" | "urgent"
      task_status:
        | "pending"
        | "assigned"
        | "in_progress"
        | "completed"
        | "cancelled"
      task_type:
        | "grocery"
        | "medical"
        | "transport"
        | "companion"
        | "household"
        | "other"
      transport_mode: "walking" | "car" | "bike" | "bus"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      alert_status: ["active", "resolved", "cancelled"],
      app_role: ["admin", "volunteer", "senior"],
      donation_status: ["pending", "approved", "received", "cancelled"],
      donation_type: ["financial", "items"],
      event_status: ["upcoming", "ongoing", "completed", "cancelled"],
      message_type: ["text", "image", "video", "location"],
      task_priority: ["low", "medium", "high", "urgent"],
      task_status: [
        "pending",
        "assigned",
        "in_progress",
        "completed",
        "cancelled",
      ],
      task_type: [
        "grocery",
        "medical",
        "transport",
        "companion",
        "household",
        "other",
      ],
      transport_mode: ["walking", "car", "bike", "bus"],
    },
  },
} as const
