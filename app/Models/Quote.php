<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quote extends Model
{
    function quotation(): BelongsTo{
        return $this->belongsTo(Quotation::class);
    }

    function quoteItems(): HasMany {
        return $this->hasMany(QuoteItem::class);
    }

    function staff(): BelongsTo{
        return $this->belongsTo(Staff::class);
    }
}
