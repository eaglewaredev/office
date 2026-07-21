<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Staff extends Authenticatable
{
    use HasFactory;

    function quotations(): HasMany {
        return $this->hasMany(Quotation::class);
    }

    function quotes(): HasMany {
        return $this->hasMany(Quote::class);
    }

    function invoices(): HasMany {
        return $this->hasMany(Invoice::class);
    }
}
