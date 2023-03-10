

export function generateColor(){
    const hue = Math.floor(Math.random() * 361);
    const saturation = Math.floor(Math.random() * 51) + 50;
    const lightness = Math.floor(Math.random() * 31) + 40;
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    return color;
}

