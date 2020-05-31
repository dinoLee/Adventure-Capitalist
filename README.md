## Welcome to Adventure-Capitalist Pages

Development Tool : [Cocos Creator v2.3.4](https://www.cocos.com/en/creator/download)

Development Script : [Typescript](https://www.typescriptlang.org/)

Static Data Format : [json](https://www.json.org/json-en.html)

Play Environment : [Web browser (mobile / desktop) of Cocos Creator support](https://docs.cocos.com/creator/manual/en/publish/publish-web.html#browser-compatibility)

[Play](https://dinolee.github.io/Adventure-Capitalist/Deploy/index.html)

### How to play
1) Pick Potato, so Begin to Operate.
2) After 5 sec, get $1 for Potato OutPut.
3) Buy Potato, so get one Potato. and repeat 1), 2), 3).
4) Hire Potato Manager to Need $10. If You have enough money, so Hire Potato Manager. Then, automate to repeat 1), 2). 
5) If Reset Game, Pick Reset Button at the bottom right of the screen.

### How to change static data for custom play
- [static data file](https://github.com/dinoLee/Adventure-Capitalist/blob/master/WorkSpace/assets/resources/Data/StaticData.json)
- Maximum Business Count : 5

```
Business Data Structure
{ 
  "Index":1, // Index begin from 1
  "Name":"Potato", // Business Name
  "Price":1, // Business purchase price per piece
  "Output":1, // Business Operation OutPut 
  "DurationSecTime":5, // Business Operation Duration(seconds)
  "UpgradePrice":100, // Upgrade purchase  Price for Business
  "UpgradeEffect":10 // If Upgraded, get a 10 times of Potato OutPut.
}

Manager Data Structure
{
  "Index":1, // Index begin from 1. This index is same Business Data Index.
  "Name":"Jack", // Manager Name
  "Price":10 // Hiring Price of Manager
}
```
### Game Flow Diagram
![Image](https://github.com/dinoLee/Adventure-Capitalist/blob/master/Adventure-Capitalist.png)

### Description of the problem and solution.
1)
- Problem) Table data format<br>
Easy-to-read data format
- Solution)
Use Json format.
- Reasoning)
It is a well-known data format, and the key-value format makes it easy to understand the data and its meaning.

- Problem) 테이블 데이터 포맷을 읽기 쉬운 데이터 포맷으로 사용하기
- Solution) Json 포맷을 사용한다.
- Reasoning)
잘 알려진 데이터 포맷이고, key-value 포맷으로  데이터와 그 의미를 쉽게 파악할 수 있다.

2)
- Problem) Business, Manager data and code separation<br>
Business and Manager data are separated from code, so game balance can be adjusted only by changing data

- Solution)
Organize business and manager data tables into json files, load them in game, and allow games to be played only by changing data.

- Reasoning)
If the game can be operated only with data without modifying the code, the code and data are separated and there is no influence on each other, so there is little room for an issue, which helps development stability. Also, it is possible to adjust the game balance without code modification, so development and balancing can be performed simultaneously.

- Problem) Business, Manager 데이터와 코드 분리<br>
Business 와 Manager 의 데이터가 코드와 분리되어, 데이터 변경만으로 게임 밸런스를 조절하기

- Solution)
Business, Manager 데이터 테이블을 json 파일로 구성하고, 게임에서 로드하여, 데이터 변경만으로 게임을 할 수 있도록 한다.

- Reasoning)
코드 수정없이 데이터만으로 게임을 조작할 수 있으면, 코드와 데이터가 분리되어 서로 영향을 주는 일이 없으므로, 이슈 발생 여지가 거의 없어, 개발 안정성에 도움이 된다. 또, 게임 밸런스를 조절하는 일도 코드 수정없이 할 수 있어, 개발과 밸런싱을 병행할 수 있다.

3)
- Problem) Gameplay persistence<br>
If you close the browser in progress and open it again, you will need to save your game data when you restart the game.

- Solution)
Since there is no game server, I decided to use the storage space in the browser, and save / read it in the browser storage space using Cocos Creator's cc.sys.localStorage API.

- Reasoning)
There is no time and cost to build a game server, and it can be important to check the gameability by quickly implementing only the core of the game.

- Problem) 게임 플레이 지속 문제<br>
게임 진행 중인 브라우저를 닫고, 다시 열면, 이전에 하던 게임을 다시 시작하게 할 때, 사용자의 게임 데이터 저장이 필요하다.

- Solution)
게임 서버가 없는 상태여서, 브라우저내의 저장공간을 사용하기로 하고, Cocos Creator 의 cc.sys.localStorage API 를 사용하여, 브라우저 저장공간에 저장/읽기를 함.

- Reasoning)
게임 서버를 구축할 시간과 비용이 없고, 게임의 핵심만을 빠르게 구현하여, 게임성을 확인하는 것이 중요할 수 있다.
4)
- Problem) Area separation of Resource, data, and source code files 
- Solution)
Create resources, Scene, and Script folders under Cocos Creator's project Assets folder, and separate and place the files in the data, screen, and script areas.
Create each folder of Model, View, Controller in the Script folder, and put the script file of the relevant area.
- Reasoning)
If you put the files in the folder according to the use of the file in the project folder, file management becomes easier. In the case of scripts, the conceptual division of MVC is divided into actual folders. This clearly shows the role of the file.
- Problem) 리소스, 데이터, 소스 코드 파일의 영역 구분
- Solution)
Cocos Creator 의 프로젝트 Assets 폴더 하위에 resources, Scene, Script 폴더를 만들어서, 데이터, 화면, 스크립트 영역의 파일들을 각각 구분하여, 놓기.
Script 폴더내에 Model, View, Controller 각각의 폴더를 만들어서, 해당 영역의 스크립트 파일을 두기.
- Reasoning)
프로젝트 폴더안에 파일의 쓰임에 따른 폴더안에 해당 파일들을 두게 되면, 파일 관리가 편하여 진다. 그리고, 스크립트의 경우 MVC 개념적인 구분이 실제 폴더로 구분된다. 이것은 명확하게 해당 파일이 하는 역할을 알 수 있다.

### Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project.
1)
- Problem) Game state management<br>
The number of game states is small, simple, and the state is not specified and processed, but if the size of the game becomes larger, the complexity is increased, and thus, it is expected that there are many issues.
- Solution)
Introducing the FSM, allowing game states to be differentiated and switched.
- Reasoning)
When the game state is frequently changed, appropriate processing of data, views, etc. according to the relationship between states with FSM has the effect of isolating codes according to states, thereby reducing the issues caused by this.

- Problem) 게임 상태 관리<br>
게임 상태의 수가 적고, 간단하여, 상태를 지정하여, 처리를 하지 않았으나, 게임의 규모가 더 커진다면, 복잡도가 높아져서, 이로 인한 이슈가 많아 질 것으로 예상된다.
- Solution)
FSM 를 도입하여, 게임 상태를 구분하고, 전환할 수 있도록 하기.
- Reasoning)
게임 상태가 빈번하게 변경될 때, FSM 으로 상태간 관계에 따라 Data, View 등을 적절하게 처리하는 것은 상태에 따른 코드들을 격리하는 효과가 있어서, 이로 인한 이슈를 줄일 수 있다.
2)
- Problem) Business state management<br>
The business state is divided into 5 categories: None, Ready, Play, BeginBusiness, and EndBusiness, and it is processed as Switch-Case. When the business state is changed, added, or deleted, all codes related to Switch-Case are modified, and the scope of code impact due to the modification is widened, so that the cause of unknown cause can be created.
- Solution)
There is a way to have a class/function that handles only the state for each business state, put it in a state container, and notify the state container when it becomes a necessary state, so that the state class/function handles it.
- Reasoning)
If you use a class/function that handles only that state for each business state, code between states suffers, and when you modify it, you can focus on that state and process it, so you can minimize issues.

- Problem) Business 상태 관리<br>
Business 상태를 None, Ready, Play, BeginBusiness, EndBusiness 5가지로 나누고, Switch-Case 로 처리하고 있다. Business 상태 변경되거가, 추가, 삭제될 때, Switch-Case와 관련된 코드를 모두 수정하게 되어, 수정으로 인한 코드 영향 범위가 넓어져서, 원인을 알 수 없는 이슈를 만들 수 있다.
- Solution)
Business 상태별로 해당 상태만을 처리하는 class/function를 두고, 이를 상태 콘테이너에 넣어두고, 필요한 상태가 되었을 때, 이 상태 콘테이너에게 알려주면, 해당 상태 class/function에서 처리하도록 하는 방법이 있다.
- Reasoning)
Business 상태별로 해당 상태만을 처리하는 class/function를 사용하면, 상태간 코드가 겪리되어, 수정시, 해당 상태에만 집중하여, 처리를 할 수 었어, 이슈를 최소화 할 수 있다.
3)
- Problem) UserBusiness data storage processing<br>
Here, the game data is read / written locally in the UserBusiness class. If a storage server is introduced, the storage processing depends on the UserBusiness class, and the UserBusiness class code needs to be modified. This affects the UserBusiness class code, which may create other issues.
- Solution)
A controller for storing processing is separately set, and user business data is read / written. There is no server at this time, but you can create a mock server as if you have a server, so that the controller can send and load data to the mock server.
- Reasoning)
The game data storage processing is separated from the UserBusiness class, and a data storage / reading Controller and a mock server are introduced. Then, there is no real server, but you can implement it as if you have a server. Since it is implemented as if there is a real server, most of the client area can be tested during the server linkage test. Even when the actual storage server is used later, the game server can be connected by only changing the server address to the real server.

- Problem) UserBusiness 데이터 저장 처리<br>
여기서는 UserBusiness 클래스 내에서 게임 데이터를 로컬에 읽기/쓰기를 하고 있다. 저장소 서버가 도입된다면, 저장 처리가 UserBusiness  클래스에 종속되어, UserBusiness 클래스 코드를 수정해야 한다. 이것은 UserBusiness 클래스 코드에 영향을 주게 되어, 다른 이슈를 만들수도 있습니다.
- Solution)
저장 처리를 하는 Controller 를 별도로 두고, 여기서, UserBusiness 데이터 읽기/쓰기를 처리를 한다. 지금은 서버가 없지만, 서버가 있는 것처럼 Mock 서버를 만들어서, Controller 이 Mock 서버에게 데이터를 전송하고, 로드하는 것처럼 할 수 있다.
- Reasoning)
게임 데이터 저장 처리를 UserBusiness 클래스와 분리하고, 데이터 저장/읽기 Controller와 Mock 서버를 도입한다. 그러면, 실제 서버가 없지만, 서버가 있는 것처럼 구현할 수 있다. 실제 서버가 있는 것처럼 구현되므로, 서버 연동 테스트 중 클라이언트 영역은 거의 대부분의 테스트를 해 볼 수 있다. 나중에 실제 저장소 서버를 사용하게 될 때도, 서버 주소 정도만을 실제 서버로 변경하는 수정만으로, 게임 서버 연결을 할 수도 있다.
4)
- Problem) Time handling problem<br>
When a manager is hired and production is performed automatically, the time of the web browser is taken and the time is calculated, and there is a possibility of obtaining a large amount of money by manipulating the time in the web browser.
- Solution)
Getting and using time from the time server
- Reasoning)
This can be a good choice, as the user cannot arbitrarily manipulate the time on the remote time server.

- Problem) 시간 처리 문제<br>
매니저를 고용하여, 자동으로 생산을 하게 되는 경우, 웹브라우저의 시간을 가져다가 시간 계산을 하고 있어, 웹브라우저내의 시간을 조작하여, 많은 양의 머니를 획득할 가능성이 있다.
- Solution)
타임서버에서 시간을 가져와서, 사용하기
- Reasoning)
윈격지의 타임서버의 시간을 사용자가 임의로 조작할 수 없으므로, 좋은 선택일 수 있다. 
5)
- Problem) Problem saving game data in a web browser<br>
1.Even if it is encrypted and stored, there is a possibility that the user can open it and operate it.<br>
2.If you play the game in a browser other than the one where you started the game, you must start from the beginning.
- Solution)
Using the storage provided by Firebase, the user's game data is stored in a remote storage.
- Reasoning)
With Firebase, you can use the storage functions you need, saving you a lot of development time and avoiding the various issues associated with building your server, rather than building your own storage server.

- Problem) 웹브라우저내에 게임 데이터를 저장하는 문제<br>
1.암호화를 하여, 저장을 하더라도, 사용자가 열어 조작할 수 있는 가능성이 있다.<br>
2.게임을 처음 시작한 브라우저가 아닌 다른 브라우저에서 게임을 하면, 처음부터 시작해야 한다.
- Solution)
Firebase 등에서 제공하는 스토리지를 사용하여, 원격지의 저장소에 사용자의 게임 데이터를 저장한다.
- Reasoning)
Firebase 를 사용하면, 필요한 스토리지 기능을 사용할 수 있어, 저장소 서버를 직접 구축하는 것보다, 개발 시간을 많이 단축할 수 있고, 직접 구축에 따른 다양한 이슈를 피할 수 있다.
6)
- Problem) When adding business data, the problem of adding the corresponding business view<br>
It is necessary to have the Business View automatically configured for the number of business data.
- Solution)
Using Cocos Creator's Prefab Clone function, you can create business views according to the number of business data.
- Reasoning)
The game's UI and views can be changed frequently. It is advantageous to reduce the development time and effort by having a data-based output on the screen.

- Problem) Business 데이터를 추가할 때, 해당 Business View 를 추가작업하는 문제<br>
Business 데이터의 수에 맞게 Business View 가 자동으로 구성되도록 하는 것이 필요하다.
- Solution)
Cocos Creator 의 Prefab Clone 기능을 이용하여, Business 데이터의 수에 맞게 Business View 를 생성할 수 있다.
- Reasoning)
게임의 UI 와 View 들은 빈번하게 변경할 수 있다. 데이터 기반으로, 화면에 출력하도록 하는 것이, 개발 시간과 수고를 줄이는데 유리하다.
7)
- Problem) Reset Game<br>
If you select the Reset button at the bottom right of the screen, the game will be reset immediately without any warning, and if you make a mistake, you cannot recover it.
- Solution)
A pop-up window that confirms whether or not to reset is exposed, and only when confirmed, reset is performed.
- Reasoning)
It is an important function to initialize the entire game, and it is good to use it carefully.

- Problem) Reset Game<br>
화면 오른쪽 하단의 Reset 버튼을 선택하면, 아무런 경고 없이, 바로 게임을 리셋해 버려서, 실수로 선택할 경우, 복구할 수 없다.
- Solution)
Reset 여부를 확인하는 팝업창을 노출하여, 여기서, 확인된 경우만, Reset를 하게 한다.
- Reasoning)
게임 전체를 초기화 시키는 중요한 기능으로, 신중하게 사용하도록 하는 것이 좋다.
8)
- Problem) Start screen<br>
There is no start screen, so when you start the game for the first time, you can see the Business View reset, so the view is not good.
- Solution)
Configure the Start button and title on the Start screen, select the Start button, and make the Business View settings appear.

- Problem) 시작화면<br>
시작 화면이 없어서, 처음 게임을 시작하면, Business View 가 초기화 되는 모습을 볼 수 있어, 보기가 좋지 않다.
- Solution)
시작 화면에 Start 버튼과 타이틀 등을 구성하고, Start 버튼을 선택하고, Business View 설정이 다 된 상태가 보이도록 합니다.
9) 
- Problem) Build and deployment process automation
- Solution)
To automatically deploy to the server for testing after modifying code and resources, write a Command Line build script, integrate Git, Jenkin, and deploy
- Reasoning)
By automating the deployment process, you can avoid mistakes caused by manual builds and deployments, and the resulting stability reduces development stress. Due to the automation, you can check the build status at any time, and you can immediately check the issues, so you can respond as necessary.

- Problem) 빌드 및 배포과정 자동화
- Solution)
코드 및 리소스 수정 후에 테스트를 위한 서버에 자동으로 배포하려면, Command Line 빌드 스크립트를 작성하고, Git, Jenkin 를 연동하여, 배포하기
- Reasoning)
배포 과정을 자동화 하면, 수동 빌드, 배포로 인한 실수를 예방할 수 있고, 이로 인한 안정감은 개발 스트레스를 줄인다. 자동화 인해, 언제든 빌드 상태를 확인할 수 있어, 이슈를 바로 확인할 수 있어, 필요한 대응을 할 수 있다.
