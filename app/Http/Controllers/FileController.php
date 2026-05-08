<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Events\FileUploaded;
use App\Events\FileDeleted;

class FileController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'file' => 'required|file|max:10240', // 10MB max
            'client_can_download' => 'boolean',
        ]);

        $project = Project::findOrFail($request->project_id);
        if ($project->user_id !== Auth::id()) {
            abort(403);
        }

        $upload = $request->file('file');
        $path = $upload->store('projects/'.$project->id.'/files', 'public');

        $file = File::create([
            'project_id' => $project->id,
            'user_id' => Auth::id(),
            'file_name' => $upload->getClientOriginalName(),
            'file_path' => $path,
            'file_type' => \App\Enums\FileType::GENERAL->value,
            'file_size' => $upload->getSize(),
            'mime_type' => $upload->getMimeType(),
            'client_can_download' => $request->boolean('client_can_download', true),
            'created_at' => now(),
        ]);

        event(new FileUploaded($file));

        return back()->with('success', 'File uploaded successfully.');
    }

    /**
     * Download the specified file.
     */
    public function download(File $file)
    {
        $project = $file->project;

        // Authorization
        if ($project->user_id !== Auth::id()) {
            $client = Auth::user()->client;
            if (! $client || $project->client_id !== $client->id || ! $file->client_can_download) {
                abort(403);
            }
        }

        $file->increment('download_count');

        return Storage::disk('public')->download($file->file_path, $file->file_name);
    }

    /**
     * Remove the specified file from storage.
     */
    public function destroy(File $file)
    {
        if ($file->project->user_id !== Auth::id()) {
            abort(403);
        }

        Storage::disk('public')->delete($file->file_path);
        
        $fileClone = clone $file;
        $file->delete();

        event(new FileDeleted($fileClone));

        return back()->with('success', 'File deleted successfully.');
    }
}
