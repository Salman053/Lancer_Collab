<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $projectId = $this->route('project')?->id;

        return [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects,slug,' . ($projectId ?? 'NULL'),
            'description' => 'required|string',
            'status' => 'required|string|in:backlog,open,in_progress,on_review,testing,completed,on_hold,cancelled,archived',
            'priority' => 'required|string|in:low,medium,high,urgent',
            'type' => 'required|string|in:Web,Mobile,Desktop,Marketing,Construction,Other',
            'progress' => 'required|integer|between:0,100',
            'budget' => 'nullable|numeric|min:0',
            'currency' => 'required|string|max:3',
            'actual_cost' => 'nullable|numeric|min:0',
            'billing_type' => 'required|string|in:fixed,hourly,retainer',
            'start_date' => 'nullable|date',
            'deadline' => 'nullable|date|after_or_equal:start_date',
            'client_id' => 'required|exists:clients,id',
            'notes' => 'nullable|string',
            'color' => 'nullable|string|max:20',
            'thumbnail' => 'nullable|string|max:255',
        ];
    }

}
