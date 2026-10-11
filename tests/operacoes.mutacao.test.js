const {
  divisao, raizQuadrada, fatorial, mediaArray, maximoArray, minimoArray,
  isPar, isImpar, isPrimo, produtoArray, clamp, isDivisivel,
  celsiusParaFahrenheit, fahrenheitParaCelsius, inverso,
  isMaiorQue, isMenorQue, isEqual, medianaArray
} = require('../src/operacoes');

describe('Testes reforçados (eficácia contra mutação)', () => {
  test('divisão por zero deve lançar mensagem específica', () => {
    expect(() => divisao(1, 0)).toThrow('Divisão por zero não é permitida.');
  });

  test('raiz quadrada rejeita negativos e aceita zero', () => {
    expect(() => raizQuadrada(-1)).toThrow(
      'Não é possível calcular a raiz quadrada de um número negativo.'
    );
    expect(raizQuadrada(0)).toBe(0);
  });

  test('fatorial cobre base 0/1, loop e rejeição de negativos', () => {
    expect(fatorial(0)).toBe(1);
    expect(fatorial(1)).toBe(1);
    expect(fatorial(2)).toBe(2);
    expect(() => fatorial(-1)).toThrow('Fatorial não é definido para números negativos.');
  });

  test('média de array vazio retorna zero', () => {
    expect(mediaArray([])).toBe(0);
  });

  test('maximo e minimo em array vazio lançam erro', () => {
    expect(() => maximoArray([])).toThrow('Array vazio');
    expect(() => minimoArray([])).toThrow('Array vazio');
  });

  test('paridade distingue par, ímpar e zero', () => {
    expect(isPar(4)).toBe(true);
    expect(isPar(3)).toBe(false);
    expect(isPar(0)).toBe(true);
    expect(isImpar(3)).toBe(true);
    expect(isImpar(4)).toBe(false);
    expect(isImpar(0)).toBe(false);
  });

  test('isPrimo cobre não-primos, 1 e primos pequenos', () => {
    expect(isPrimo(0)).toBe(false);
    expect(isPrimo(1)).toBe(false);
    expect(isPrimo(2)).toBe(true);
    expect(isPrimo(4)).toBe(false);
    expect(isPrimo(9)).toBe(false);
  });

  test('produto de array vazio é 1', () => {
    expect(produtoArray([])).toBe(1);
  });

  test('produto de array vazio retorna 1 sem invocar reduce', () => {
    const reduceSpy = jest.spyOn(Array.prototype, 'reduce');
    try {
      expect(produtoArray([])).toBe(1);
      expect(reduceSpy).not.toHaveBeenCalled();
    } finally {
      reduceSpy.mockRestore();
    }
  });

  test('fatorial distingue ramos n=0 e n=1 antes do loop', () => {
    expect(fatorial(0)).toBe(1);
    expect(fatorial(1)).toBe(1);
    expect(fatorial(3)).toBe(6);
  });

  test('clamp nos limites e fora do intervalo', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });

  test('clamp aplica teto quando min > max (fronteira >= max)', () => {
    expect(clamp(10, 10, 5)).toBe(5);
    expect(clamp(12, 10, 5)).toBe(5);
  });

  test('clamp aplica piso quando min > max (fronteira <= min)', () => {
    expect(clamp(8, 10, 5)).toBe(10);
  });

  test('clamp no teto superior distingue -0 de +0', () => {
    expect(Object.is(clamp(-0, -1, 0), -0)).toBe(true);
  });

  test('isDivisivel retorna false quando há resto', () => {
    expect(isDivisivel(10, 3)).toBe(false);
    expect(isDivisivel(9, 3)).toBe(true);
  });

  test('conversões térmicas com valores não triviais', () => {
    expect(celsiusParaFahrenheit(100)).toBeCloseTo(212);
    expect(celsiusParaFahrenheit(-40)).toBeCloseTo(-40);
    expect(fahrenheitParaCelsius(212)).toBeCloseTo(100);
    expect(fahrenheitParaCelsius(-40)).toBeCloseTo(-40);
  });

  test('inverso de zero lança erro com mensagem', () => {
    expect(() => inverso(0)).toThrow('Não é possível inverter o número zero.');
  });

  test('comparações booleanas incluem casos falsos e empate', () => {
    expect(isMaiorQue(10, 10)).toBe(false);
    expect(isMaiorQue(5, 10)).toBe(false);
    expect(isMenorQue(10, 10)).toBe(false);
    expect(isMenorQue(10, 5)).toBe(false);
    expect(isEqual(7, 8)).toBe(false);
  });

  test('mediana: array vazio, par desordenado e ímpar desordenado', () => {
    expect(() => medianaArray([])).toThrow('Array vazio');
    expect(medianaArray([4, 1, 2, 3])).toBe(2.5);
    expect(medianaArray([5, 1, 3])).toBe(3);
  });
});
