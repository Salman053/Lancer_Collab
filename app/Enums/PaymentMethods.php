<?php
namespace App\Enums;

enum PaymentMethods: string
{
    case STRIPE = 'stripe';
    case PAYPAL = 'paypal';
    case BANK_TRANSFER = 'bank_transfer';
    case EASY_PAISA = 'easy_paisa';
    case CASH = 'cash';

    public function label(): string
    {
        return match ($this) {
            self::STRIPE => 'Credit Card (Stripe)',
            self::PAYPAL => 'PayPal Express',
            self::BANK_TRANSFER => 'Direct Bank Wire',
            self::CASH => 'Cash Payment',
            self::EASY_PAISA => 'Easy Paisa Pakistan',
        };
    }
}
