<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuditLogController extends Controller
{
    public function index()
    {
        $logs = AuditLog::latest()
            ->paginate(50);

        return Inertia::render('admin/audit-logs/index', [
            'logs' => $logs,
        ]);
    }
}
