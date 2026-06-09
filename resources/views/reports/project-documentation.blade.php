<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Helvetica', 'Arial', sans-serif; font-size: 12px; line-height: 1.6; color: #333; }
        h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
        h2 { color: #34495e; background-color: #ecf0f1; padding: 10px; border-radius: 4px; }
        .section { margin-bottom: 30px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #f8f9fa; }
        .metadata { margin-bottom: 20px; color: #7f8c8d; }
        .msg { margin-bottom: 10px; padding: 10px; background: #fdfdfd; border-left: 3px solid #3498db; }
    </style>
</head>
<body>
    <h1>Project: {{ $project->title }}</h1>
    <div class="metadata">
        <p><strong>Client:</strong> {{ $project->client->name }} ({{ $project->client->company }})</p>
        <p><strong>Status:</strong> {{ ucfirst($project->status->label()) }} | <strong>Type:</strong> {{ $project->type }}</p>
        <p><strong>Budget:</strong> {{ $project->currency }} {{ number_format($project->budget, 2) }}</p>
    </div>

    <div class="section">
        <h2>Milestones</h2>
        <table>
            <tr><th>Title</th><th>Status</th><th>Due Date</th></tr>
            @foreach($project->milestones as $milestone)
            <tr><td>{{ $milestone->title }}</td><td>{{ ucfirst($milestone->status->label()) }}</td><td>{{ $milestone->due_date }}</td></tr>
            @endforeach
        </table>
    </div>

    <div class="section">
        <h2>Tasks</h2>
        <table>
            <tr><th>Title</th><th>Status</th></tr>
            @foreach($project->tasks as $task)
            <tr><td>{{ $task->title }}</td><td>{{ $task->is_completed ? 'Completed' : 'Pending' }}</td></tr>
            @endforeach
        </table>
    </div>

    <div class="section">
        <h2>Project Updates</h2>
        @foreach($project->updates as $update)
            <div class="msg">
                <p><strong>{{ $update->created_at != null &&  $update->created_at->format('Y-m-d') }}</strong></p>
                <p>{{ $update->message }}</p>
            </div>
        @endforeach
    </div>

    <div class="section">
        <h2>Messages</h2>
        @foreach($project->messages as $message)
            <div class="msg">
                <p><strong>{{ $message->sender->name }}</strong> ({{ $message->created_at->format('H:i') }}):</p>
                <p>{{ $message->message }}</p>
            </div>
        @endforeach
    </div>
</body>
</html>
