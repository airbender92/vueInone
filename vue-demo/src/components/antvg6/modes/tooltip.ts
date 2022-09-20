
type FormatterFn = (model: any) => string 

const tooltip = (formatter: FormatterFn) => {
  return {
    type: 'tooltip',
    formatText(model: any) {
      const text = formatter(model);
      return text
    }
  }
}

export default tooltip