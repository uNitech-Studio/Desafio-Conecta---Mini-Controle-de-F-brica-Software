Schema::create('timesheets', function (Blueprint $table) {
    $table->id();
    $table->foreignId('projeto_id')->constrained('projects')->cascadeOnDelete();
    $table->string('colaborador');
    $table->date('data');
    $table->decimal('horas', 6, 2);
    $table->enum('tipo', ['corretiva','evolutiva','implantacao','legislativa']);
    $table->text('descricao')->nullable();
    $table->timestamps();

    $table->index(['projeto_id', 'data']);
});
