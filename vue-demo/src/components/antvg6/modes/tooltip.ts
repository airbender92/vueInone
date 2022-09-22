type TooltipType = 'tooltip' | 'edge-tooltip'

type FormatterFn = (model: any) => string 

const tooltip = (type: TooltipType, formatter: FormatterFn) => {
  return {
    type,
    formatText(model: any) {
      const text = formatter(model);
      return text
    }
  }
}

export default tooltip