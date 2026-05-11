<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $title }}</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; color: #333; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #eee; padding-bottom: 20px; }
        .header h1 { margin: 0; color: #1a1a1a; }
        .header p { margin: 5px 0; color: #666; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th { background-color: #f8f9fa; border: 1px solid #dee2e6; padding: 10px; text-align: left; }
        td { border: 1px solid #dee2e6; padding: 10px; }
        .text-right { text-align: right; }
        .footer { position: fixed; bottom: 0; width: 100%; text-align: center; font-size: 10px; color: #999; padding: 10px 0; }
        .status-paid { color: green; font-weight: bold; }
        .status-pending { color: orange; font-weight: bold; }
        .total-row { background-color: #eee; font-weight: bold; }
    </style>
</head>
<body>
    <div className="header">
        <h1>{{ $title }}</h1>
        <p>Generated on: {{ now()->format('F d, Y H:i') }}</p>
        <p>User: {{ $user->name }} ({{ ucfirst($user->role->value) }})</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Project</th>
                <th>Milestone</th>
                <th>Method</th>
                <th>Status</th>
                <th className="text-right">Amount</th>
            </tr>
        </thead>
        <tbody>
            @php $total = 0; @endphp
            @foreach($payments as $payment)
                <tr>
                    <td>{{ $payment->created_at->format('Y-m-d') }}</td>
                    <td>{{ $payment->project->title }}</td>
                    <td>{{ $payment->milestone ? $payment->milestone->title : 'N/A' }}</td>
                    <td>{{ ucfirst($payment->method->value ?? $payment->method) }}</td>
                    <td className="status-{{ strtolower($payment->status->value ?? $payment->status) }}">
                        {{ strtoupper($payment->status->value ?? $payment->status) }}
                    </td>
                    <td className="text-right">
                        ${{ number_format($payment->amount, 0) }}
                    </td>
                </tr>
                @if(($payment->status->value ?? $payment->status) === 'completed')
                    @php $total += $payment->amount; @endphp
                @endif
            @endforeach
            <tr className="total-row">
                <td colspan="5" className="text-right">Total Paid Amount:</td>
                <td className="text-right">${{ number_format($total, 0) }}</td>
            </tr>
        </tbody>
    </table>

    <div className="footer">
        © {{ date('Y') }} {{ config('app.name') }}. All rights reserved.
    </div>
</body>
</html>
