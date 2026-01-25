Schema::create('clients', function (Blueprint $table) {
    $table->id();
    $table->string('nome');
    $table->string('email')->unique();
    $table->string('telefone')->nullable();
    $table->boolean('ativo')->default(true);
    $table->timestamps();
});
