const get = (target) => document.querySelector(target);

const $calculator = get(".calculator");
const $buttons = get(".calculator_buttons");

const $display = get(".calculator_bare");

// TODO : n1과 n2를 operator에 따라 계산하는 함수를 만드세요.
function calculator(n1, operator, n2) {
  let result = 0;
  if (operator === "+") {
    result = Number(n1) + Number(n2);
  } else if (operator === "-") {
    result = Number(n1) - Number(n2);
  } else if (operator === "*") {
    result = Number(n1) - Number(n2);
  } else if (operator === "/") {
    result = Number(n1) - Number(n2);
  }
  return String(result);
}

let firstNum, operatorForAdvanced, prevKey, prevNum;

const calculatorEvent = (event) => {
  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드는 수정하지 마세요.

  // ! 여기서부터 Advanced Challenge & Nightmare 과제를 풀어주세요.
  if (target.matches("button")) {
    if (action === "number") {
      if ($display.textContent === "0" || prevKey === "operator" || prevKey === "calculate") {
        $display.textContent = buttonContent;
      } else {
        $display.textContent += buttonContent;
      }
      prevKey = "number";
    }
    if (action === "operator") {
      if (firstNum && operatorForAdvanced && prevKey !== "operator" && prevKey !== "calculate") {
        //operator키를 누를 시 화면에 나타나는 값은 calculate함수에 의해 계산되는 문자열 타입의 리턴 값
        $display.textContent = calculator(firstNum, operatorForAdvanced, $display.textContent);
      }
      firstNum = $display.textContent;
      operatorForAdvanced = buttonContent;
      prevKey = "operator";
    }
    if (action === "decimal") {
      if (!$display.textContent.includes(".") && prevKey != "operator") {
        $display.textContent += ".";
      } else if (prevKey === "operator") {
        $display.textContent = "0.";
      }
    }
    if (action === "clear") {
      $display.textContent = "0";
      operatorForAdvanced = undefined;
      firstNum = undefined;
      prevNum = undefined;
      prevKey = "clear";
    }
    if (action === "enter") {
      if (firstNum) {
        if (prevKey === "enter") {
          // 연속으로 엔터를 누를 경우
          $display.textContent = calculator($display.textContent, operatorForAdvanced, prevNum);
        } else {
          prevNum = $display.textContent;
          $display.textContent = calculator(firstNum, operatorForAdvanced, $display.textContent);
        }
      }
      prevKey = "enter";
    }
  }
};

$buttons.addEventListener("click", calculatorEvent);
