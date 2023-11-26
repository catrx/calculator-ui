<script setup lang="ts">
import { ref } from 'vue'
import CalculatorPanel from '@/components/Calculator/CalculatorPanel.vue'
import CalculatorButton from '@/components/Calculator/CalculatorButton.vue'
import type {Operation, Operator} from '@/components/Calculator/types'
import { postOperation } from '@/service/calculator.service'

const items = [
  ['C', '+/-', '%', '÷'],
  ['7', '8', '9', 'x'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '', '=']
]

const displayValue = ref<string>('0')
const operation = ref<Operation>({ firstValue: null, operator: null, secondValue: null })
const isOperatorClicked = ref<boolean>(false)

const addValue = async (value: string) => {
  if (value === '') return
  if (value === '=') {
    let result = await postOperation(operation.value)
    displayValue.value = result.toString()
    clearValues()
  } else if (['+', '-', 'x', '÷'].includes(value)) {
    await handleOperator(value)
  } else if (value === 'C') {
    displayValue.value = '0'
    clearValues()
  } else if (value === '+/-') {
    toggleSign()
  } else if (value === '%') {
    calculatePercentage()
  } else {
    handleNumeric(value)
  }
}

const handleOperator = async (value: Operator) => {
  if (isOperatorClicked.value) {
    operation.value.operator = value
  } else {
    if (
      operation.value.operator &&
      operation.value.firstValue !== null &&
      operation.value.secondValue !== null
    ) {
      let result = await postOperation(operation.value)
      displayValue.value = result.toString()
      clearValues()
    }
    operation.value.operator = value
    operation.value.firstValue = parseFloat(displayValue.value)
    isOperatorClicked.value = true
  }
}

const handleNumeric = (value: string) => {
  if (isOperatorClicked.value) {
    displayValue.value = value
    isOperatorClicked.value = false
  } else {
    displayValue.value = displayValue.value === '0' ? value : displayValue.value + value
  }

  if (operation.value.operator === null) {
    operation.value.firstValue = parseFloat(displayValue.value)
  } else {
    operation.value.secondValue = parseFloat(displayValue.value)
  }
}

const clearValues = () => {
  operation.value.firstValue = null
  operation.value.operator = null
  operation.value.secondValue = null
  isOperatorClicked.value = false
}

const toggleSign = () => {
  displayValue.value = (parseFloat(displayValue.value) * -1).toString()

  if (operation.value.operator === null) {
    operation.value.firstValue = parseFloat(displayValue.value)
  } else {
    operation.value.secondValue = parseFloat(displayValue.value)
  }
}

const calculatePercentage = () => {
  displayValue.value = (parseFloat(displayValue.value) / 100).toString()

  if (operation.value.operator === null) {
    operation.value.firstValue = parseFloat(displayValue.value)
  } else {
    operation.value.secondValue = parseFloat(displayValue.value)
  }
}
</script>

<template>
  <div
    class="w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden"
    style="max-width: 300px"
  >
    <CalculatorPanel :result="displayValue"></CalculatorPanel>
    <div class="w-full bg-gradient-to-b from-orange-400 to-orange-500">
      <div :key="index" v-for="(item, index) in items" class="flex w-full">
        <CalculatorButton
          :key="index"
          v-for="(value, index) in item"
          :value="value"
          :addValue="addValue"
        ></CalculatorButton>
      </div>
    </div>
  </div>
</template>
