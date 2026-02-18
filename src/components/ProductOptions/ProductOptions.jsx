import React from 'react';

export default function ProductOptions({
  sizes = ['39', '40', '41', '42', '43'],
  colors = ['#C92071', '#0D6EFD', '#198754', '#F6AA1C'],
  sampleColors = ['#FFB6C1', '#FFD59A', '#C1E8FF', '#B7F7C7', '#E7C5FF'],
  selectedSize,
  selectedColor,
  selectedSampleColor,
  onSizeChange,
  onColorChange,
  onSampleColorChange
}) {
  const currentSize = selectedSize ?? sizes[0];
  const currentColor = selectedColor ?? colors[0];
  const currentSampleColor = selectedSampleColor ?? sampleColors[0];

  return (
    <div className="flex flex-col gap-[20px]">
      <div>
        <p className="text-[14px] font-bold text-neutral-darkGray2 mb-[10px]">Tamanho</p>
        <div className="flex gap-[8px] flex-wrap">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onSizeChange?.(size)}
              className={`w-[46px] h-[46px] rounded-[6px] border text-[14px] font-bold transition ${
                currentSize === size
                  ? 'border-primary text-primary bg-primary/10 ring-2 ring-primary/30 ring-offset-2 ring-offset-neutral-white'
                  : 'border-neutral-lightGray2 text-neutral-darkGray2 hover:border-primary'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[14px] font-bold text-neutral-darkGray2 mb-[10px]">Cor</p>
        <div className="flex gap-[10px]">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onColorChange?.(color)}
              className={`w-[44px] h-[44px] rounded-full border transition ${
                currentColor === color
                  ? 'border-primary ring-2 ring-primary/40 ring-offset-2 ring-offset-neutral-white'
                  : 'border-transparent hover:border-primary'
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Cor ${color}`}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="text-[14px] font-bold text-neutral-darkGray2 mb-[10px]">Outras cores</p>
        <div className="flex gap-[10px]">
          {sampleColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onSampleColorChange?.(color)}
              className={`w-[44px] h-[44px] rounded-[8px] border transition ${
                currentSampleColor === color
                  ? 'border-primary ring-2 ring-primary/40 ring-offset-2 ring-offset-neutral-white'
                  : 'border-neutral-lightGray2 hover:border-primary'
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Outra cor ${color}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
