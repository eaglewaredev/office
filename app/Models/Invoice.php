<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model
{
    function client(): BelongsTo {
        return $this->belongsTo(Client::class);
    }

    function staff(): BelongsTo {
        return $this->belongsTo(Staff::class);
    }
}
