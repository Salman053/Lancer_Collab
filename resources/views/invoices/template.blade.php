<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            font-family: sans-serif;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .details {
            margin-bottom: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>Invoice</h1>
        <p>Project: {{ $project->title }}</p>
    </div>

    
    <div class="details">
        <p><strong>Client:</strong> {{ $project->client->name }}</p>
        <p><strong>Date:</strong> {{ date('Y-m-d') }}</p>
    </div>
    <table>
        <thead>
            <tr>
                <th>Milestone</th>
                <th>Due Date</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($project->milestones as $milestone)
                <tr>
                    <td>{{ $milestone->title }}</td>
                    <td>{{ $milestone->due_date }}</td>
                    <td>{{ $milestone->amount }} {{ $project->currency }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
    <p><strong>Total Budget:</strong> {{ $project->budget }}</p>
</body>

</html>
