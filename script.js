function check() {
            let name = document.getElementById('name').value;
            let age = document.getElementById('age').value;
            let result = document.getElementById('result');
            
            if (name === "" || name.trim() === "") {
                result.innerHTML = "Ошибка: имя не может быть пустым!";
                result.style.color = "red";
                return;
            }
            
            if (age === "") {
                result.innerHTML = "Ошибка: введите возраст!";
                result.style.color = "red";
                return;
            }
            
            let ageNum = Number(age);
            
            if (isNaN(ageNum)) {
                result.innerHTML = "Ошибка: возраст должен быть числом!";
                result.style.color = "red";
                return;
            }
            
            if (ageNum <= 0) {
                result.innerHTML = "Ошибка: возраст должен быть больше 0!";
                result.style.color = "red";
                return;
            }
            
            if (ageNum < 18) {
                result.innerHTML = name + ", вам доступ ограничен";
                result.style.color = "red";
            } else if (ageNum >= 18 && ageNum <= 65) {
                result.innerHTML = name + ", вам доступ разрешен";
                result.style.color = "green";
            } else {
                result.innerHTML = name + ", вам рекомендуется упрощенный режим";
                result.style.color = "orange";
            }
        }