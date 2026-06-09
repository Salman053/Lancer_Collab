<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, print-scale: 100%">
    <title>Invoice | Project Overview</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
            background: #e9eef3;
            padding: 2rem 1.5rem;
            color: #1a2634;
        }

        /* main invoice card */
        .invoice-container {
            max-width: 1100px;
            margin: 0 auto;
            background: white;
            border-radius: 28px;
            box-shadow: 0 20px 35px -12px rgba(0, 0, 0, 0.12);
            overflow: hidden;
            transition: all 0.2s;
        }

        /* inner spacing */
        .invoice-inner {
            padding: 2rem 2rem 2.2rem 2rem;
        }

        /* header area with gradient accent */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 1rem;
            margin-bottom: 2rem;
            padding-bottom: 1.2rem;
            border-bottom: 3px solid #3b82f6;
        }

        .brand h1 {
            font-size: 2.2rem;
            font-weight: 700;
            letter-spacing: -0.3px;
            background: linear-gradient(135deg, #1e293b, #2c3e66);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            margin-bottom: 0.25rem;
        }

        .brand p {
            color: #4b5563;
            font-size: 0.85rem;
        }

        .badge-status {
            background: #eef2ff;
            padding: 0.4rem 1rem;
            border-radius: 40px;
            font-size: 0.8rem;
            font-weight: 600;
            color: #1e40af;
            border: 1px solid #cbd5e1;
        }

        /* two-column details row */
        .details-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            background: #f8fafc;
            border-radius: 20px;
            padding: 1.2rem 1.5rem;
            margin-bottom: 2rem;
            gap: 1rem;
        }

        .client-box p, .project-meta p {
            margin: 0.35rem 0;
            font-size: 0.9rem;
        }

        .client-box strong, .project-meta strong {
            color: #0f172a;
            font-weight: 600;
            min-width: 70px;
            display: inline-block;
        }

        .project-meta {
            text-align: right;
        }

        @media (max-width: 640px) {
            .details-grid {
                flex-direction: column;
            }
            .project-meta {
                text-align: left;
            }
        }

        /* table styles */
        .milestone-table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.8rem 0 1.5rem;
            font-size: 0.9rem;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 1px 2px rgba(0,0,0,0.03);
        }

        .milestone-table th {
            background-color: #f1f5f9;
            text-align: left;
            padding: 14px 12px;
            font-weight: 600;
            color: #0c4a6e;
            border-bottom: 1px solid #e2e8f0;
        }

        .milestone-table td {
            padding: 12px;
            border-bottom: 1px solid #eef2f6;
            vertical-align: top;
        }

        .milestone-table tr:last-child td {
            border-bottom: none;
        }

        /* budget card & extra project summary */
        .financial-summary {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 1rem;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #e2edf7;
        }

        .total-budget {
            background: #fefce8;
            padding: 0.6rem 1.2rem;
            border-radius: 40px;
            font-weight: 700;
            font-size: 1rem;
            color: #854d0e;
        }

        .total-paid {
            background: #e0f2fe;
            padding: 0.6rem 1.2rem;
            border-radius: 40px;
            font-weight: 700;
            font-size: 1rem;
            color: #0369a1;
        }

        .remaining {
            background: #dcfce7;
            padding: 0.6rem 1.2rem;
            border-radius: 40px;
            font-weight: 700;
            font-size: 1rem;
            color: #166534;
        }

        /* milestone payment status chip */
        .status-badge {
            display: inline-flex;
            align-items: center;
            background: #f1f3f4;
            border-radius: 30px;
            padding: 0.2rem 0.7rem;
            font-size: 0.7rem;
            font-weight: 500;
        }

        .status-pending {
            background: #ffedd5;
            color: #b45309;
        }

        hr {
            margin: 1rem 0;
            border-color: #eef2ff;
        }

        .payment-history {
            background: #ffffff;
            border-radius: 18px;
            margin-top: 2rem;
            border: 1px solid #e9edf2;
        }

        .payment-title {
            font-size: 1rem;
            font-weight: 700;
            margin-bottom: 0.8rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .payment-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.85rem;
        }

        .payment-table th, .payment-table td {
            padding: 10px 8px;
            text-align: left;
            border-bottom: 1px solid #eef2f8;
        }

        .payment-table th {
            font-weight: 600;
            color: #334155;
        }

        .footer-note {
            margin-top: 2rem;
            font-size: 0.75rem;
            text-align: center;
            color: #6c757d;
            border-top: 1px dashed #dce5ef;
            padding-top: 1.5rem;
        }

        .currency-symbol {
            font-weight: 600;
        }

        .highlight {
            font-weight: 700;
            color: #0f3b5c;
        }
    </style>
</head>
<body>
<div class="invoice-container">
    <div class="invoice-inner">
        <!-- Header: brand & project title -->
        <div class="header">
            <div class="brand">
                <h1>INVOICE</h1>
                <p>Professional project billing summary</p>
            </div>
            <div class="badge-status">
                Project #{{ $project->id ?? 1 }} &nbsp;|&nbsp; {{ ucfirst($project->status->label() ?? 'open') }}
            </div>
        </div>

        <!-- Dynamic client and project details based on provided JSON -->
        <div class="details-grid">
            <div class="client-box">
                <p><strong>Client:</strong> {{ $project->client->name ?? 'Muhammad Obaid Ur Rehman' }}</p>
                <p><strong>Company:</strong> {{ $project->client->company ?? 'Systems Limited Editions' }}</p>
                <p><strong>Email:</strong> {{ $project->client->email ?? 'obaid@gmail.com' }}</p>
                <p><strong>Phone:</strong> {{ $project->client->phone ?? '+923118095538' }}</p>
                <p><strong>Address:</strong> {{ $project->client->address ?? 'Babri Banda, Kohat' }}</p>
            </div>
            <div class="project-meta">
                <p><strong>Invoice Date:</strong> {{ date('Y-m-d') }}</p>
                <p><strong>Project:</strong> {{ $project->title ?? 'POS SYSTEM' }}</p>
                <p><strong>Type:</strong> {{ $project->type ?? 'Web' }} &nbsp;|&nbsp; <strong>Priority:</strong> {{ ucfirst($project->priority ?? 'medium') }}</p>
                <p><strong>Start Date:</strong> {{ \Carbon\Carbon::parse($project->start_date ?? '2026-04-27')->format('M d, Y') }}</p>
                <p><strong>Deadline:</strong> {{ \Carbon\Carbon::parse($project->deadline ?? '2026-06-24')->format('M d, Y') }}</p>
            </div>
        </div>

        <!-- Milestones table section -->
        <h3 style="font-weight: 600; margin-bottom: 0.5rem; font-size: 1.2rem;">📌 Project Milestones</h3>
        <table class="milestone-table">
            <thead>
                <tr>
                    <th>Milestone</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($project->milestones as $milestone)
                <tr>
                    <td style="font-weight: 500;">{{ $milestone->title ?? 'Untitled milestone' }}</td>
                    <td>{{ $milestone->description ?? '—' }}</td>
                    <td>{{ $milestone->due_date ? \Carbon\Carbon::parse($milestone->due_date)->format('Y-m-d') : 'Not specified' }}</td>
                    <td><strong>{{ number_format((float)($milestone->amount ?? 0), 2) }} {{ $project->currency ?? 'USD' }}</strong></td>
                    <td><span class="status-badge status-pending">{{ ucfirst($milestone->status->label() ?? 'pending') }}</span></td>
                </tr>
                @empty
                <tr>
                    <td colspan="5" style="text-align: center; color: #6b7280;">No milestones defined for this project.</td>
                </tr>
                @endforelse
            </tbody>
        </table>

        <!-- financial summary: total budget + actual payments info -->
        @php
            $totalMilestoneAmount = 0;
            if(isset($project->milestones) && is_iterable($project->milestones)) {
                foreach($project->milestones as $ms) {
                    $totalMilestoneAmount += (float)($ms->amount ?? 0);
                }
            }

            $totalBudgetRaw = (float)($project->budget ?? 3000);
            $totalPaidFromPayments = 0;
            if(isset($project->payments) && is_iterable($project->payments)) {
                foreach($project->payments as $pmt) {
                    if(isset($pmt->status) && $pmt->status === 'completed') {
                        $totalPaidFromPayments += (float)($pmt->amount ?? 0);
                    }
                }
            }
            $remainingBalance = max(0, $totalBudgetRaw - $totalPaidFromPayments);
            $currencySym = $project->currency ?? 'USD';
        @endphp

        <div class="financial-summary">
            <div class="total-budget">💰 Total Budget: {{ number_format($totalBudgetRaw, 2) }} {{ $currencySym }}</div>
            <div class="total-paid">💵 Payments Received: {{ number_format($totalPaidFromPayments, 2) }} {{ $currencySym }}</div>
            <div class="remaining">📊 Remaining Balance: {{ number_format($remainingBalance, 2) }} {{ $currencySym }}</div>
        </div>

        <!-- Payment transactions history (complete record) -->
        @if(isset($project->payments) && count($project->payments) > 0)
        <div class="payment-history">
            <div class="payment-title">
                <span>💳 Payment History</span>
            </div>
            <table class="payment-table">
                <thead>
                    <tr><th>Transaction ID</th><th>Amount</th><th>Method</th><th>Paid Date</th><th>Status</th></tr>
                </thead>
                <tbody>
                    @foreach ($project->payments as $payment)
                    <tr>
                        <td>{{ $payment->transaction_id ?? '—' }}</td>
                        <td><strong>{{ number_format((float)($payment->amount ?? 0), 2) }} {{ $project->currency ?? 'USD' }}</strong></td>
                        <td>{{ ucfirst(str_replace('_', ' ', $payment->method->label() ?? 'bank_transfer')) }}</td>
                        <td>{{ $payment->paid_at ? \Carbon\Carbon::parse($payment->paid_at)->format('M d, Y') : '—' }}</td>
                        <td><span class="status-badge" style="background:#dcfce7; color:#166534;">{{ ucfirst($payment->status->label() ?? 'completed') }}</span></td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        @else
        <div class="payment-history" style="background:#fef9e6; padding: 0.8rem 1rem; margin-top: 1.2rem;">
            <span>ℹ️ No recorded payments yet. Invoice shows budget allocation.</span>
        </div>
        @endif

        <!-- extra project meta: description + billing type + actual cost -->
        <div style="margin-top: 1.5rem; font-size: 0.85rem; background: #fafcff; padding: 0.9rem 1.2rem; border-radius: 20px;">
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
                <div><strong>📋 Description:</strong> {{ $project->description ?? 'Project of POS system for customer tiles business' }}</div>
                <div><strong>⚙️ Billing Type:</strong> {{ ucfirst($project->billing_type ?? 'fixed') }}</div>
                <div><strong>📈 Actual Cost:</strong> {{ number_format((float)($project->actual_cost ?? 0), 2) }} {{ $currencySym }}</div>
            </div>
            <div style="margin-top: 6px;"><strong>🎨 Progress:</strong> {{ $project->progress ?? 0 }}% &nbsp;• &nbsp;<strong>Color tag:</strong> <span style="display: inline-block; width: 12px; height: 12px; background-color: {{ $project->color ?? '#3b82f6' }}; border-radius: 50%;"></span> {{ $project->color ?? '#3b82f6' }}</div>
            @if($project->thumbnail ?? false)
            <div style="margin-top: 12px;"><strong>🖼️ Project thumbnail preview:</strong><br><img src="{{ $project->thumbnail }}" alt="project thumbnail" style="max-width: 180px; border-radius: 12px; margin-top: 6px; border: 1px solid #e2e8f0;"></div>
            @endif
        </div>

        <!-- payment & milestone note summary -->
        <div style="margin-top: 1.2rem; font-size: 0.8rem; color: #2c3e4e; background: #f1f5f9; border-radius: 16px; padding: 0.8rem 1rem;">
            <span>✅ <strong>Invoice summary</strong> — This document includes all milestones, budget breakdown, and payment transactions. 
            @if($totalMilestoneAmount > 0 && abs($totalMilestoneAmount - $totalBudgetRaw) > 0.01)
                <span>Milestone total ({{ number_format($totalMilestoneAmount,2) }} {{ $currencySym }}) differs from project budget ({{ number_format($totalBudgetRaw,2) }} {{ $currencySym }}) — budget reflects overall contract value.</span>
            @elseif($totalMilestoneAmount > 0)
                <span>Milestones sum matches budget allocation.</span>
            @else
                <span>Project uses fixed budget without detailed milestone amounts.</span>
            @endif
            </span>
        </div>

        <!-- terms / footer -->
        <div class="footer-note">
            This is a system-generated invoice for project "{{ $project->title ?? 'POS SYSTEM' }}".<br>
            All amounts are in {{ $currencySym }}. For any queries contact support@yourcompany.com
        </div>
    </div>
</div>
