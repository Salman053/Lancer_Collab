<?php

namespace Tests\Feature;

use App\Events\MessageDeleted;
use App\Events\MessageSent;
use App\Models\Client;
use App\Models\Message;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class MessageTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_send_message_to_project()
    {
        Event::fake([MessageSent::class]);

        $freelancer = User::factory()->create();
        $clientUser = User::factory()->create();
        $client = Client::factory()->create(['account_id' => $clientUser->id, 'user_id' => $freelancer->id]);
        $project = Project::factory()->create(['user_id' => $freelancer->id, 'client_id' => $client->id]);

        $response = $this->actingAs($freelancer)->post(route('messages.store'), [
            'project_id' => $project->id,
            'to_user_id' => $clientUser->id,
            'message' => 'Hello Client!',
        ]);

        if ($response->status() === 500) {
            dd($response->getContent());
        }

        $response->assertRedirect();
        $this->assertDatabaseHas('messages', [
            'project_id' => $project->id,
            'message' => 'Hello Client!',
            'from_user_id' => $freelancer->id,
            'to_user_id' => $clientUser->id,
        ]);

        Event::assertDispatched(MessageSent::class);
    }
}
