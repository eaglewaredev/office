<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quotation extends Model
{
    function client(): BelongsTo{
        return $this->belongsTo(Client::class);
    }

    function quotes(): HasMany{
        return $this->hasMany(Quote::class);
    }

    function staff(): BelongsTo{
        return $this->belongsTo(Staff::class);
    }
}
