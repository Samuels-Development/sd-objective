# sd-objective

It essentially serves as an 'Objective Tracker' that can be seamlessly integrated into any of your scripts, providing players with an aesthetically pleasing UI element that clearly indicates their progress through a certain task.

Feel free to star the repository and check out my store and discord @ Discord: https://discord.gg/samueldev & Store: https://fivem.samueldev.shop 
For support inquires please create a post in the support-forum channel on discord or create an issue here on Github.

## Preview

![FiveM_b2944_GTAProcess_66azQB4dB0](https://github.com/Samuels-Development/sd-objective/assets/99494967/82139df0-9adf-48e0-9cc4-c23bf9b3ebdb)![FiveM_b2944_GTAProcess_P9Et3vNuca](https://github.com/Samuels-Development/sd-objective/assets/99494967/6b3578e0-d93c-42ab-b08d-cfe55fd2e24b)



### Video Preview
https://www.youtube.com/watch?v=B0CuSTtjuiU&feature=youtu.be

## Installation

1. Clone or download this resource.
2. Place it in the server's resource directory.
3. Add the resource to your server config, if needed.

## Usage

### Exports
Exports are exclusively available on the client and can't be called from server-side files.

- `ShowObjectiveUI(title, description, steps)`
   - `title`: The title of the objective (e.g., "Retrieve the Artifact").
   - `description`: A brief description of the objective (e.g., "Go to the ancient ruins and retrieve the artifact").
   - `steps`: Total number of steps required to complete the objective (e.g., if an objective has 4 steps, use `4`).

- `UpdateProgress()`: Call this function to advance the objective's progress by one step.

- `HideObjectiveUI()`: Immediately hide the UI, regardless of the objective's progress.

### Event Handlers
Events can be called from client & server-side.

- `sd-objective:client:showUI` (eg. ShowObjectiveUI)
- `sd-objective:client:updateProgress` (eg. UpdateProgress)
- `sd-objective:client:hideUI` (eg. HideObjectiveUI)

### Example Usage

Utilizing Exports
```lua
-- Start an objective
exports['sd-objective']:ShowObjectiveUI('Title', 'Description', 4)

-- Update progress
exports['sd-objective']:UpdateProgress()

-- Hide the UI
exports['sd-objective']:HideObjectiveUI()
```

Utilizing Events
```lua
-- Start an objective
TriggerClientEvent('sd-objective:client:showUI', source, 'Title', 'Description', 4)

-- Update progress
TriggerClientEvent('sd-objective:client:updateProgress', source)

-- Hide the UI
TriggerClientEvent('sd-objective:client:hideUI', source)
```

### Contextual Example
```lua
RegisterNetEvent('sd-oxyrun:client:getBox', function()
    local player = PlayerPedId()

    if gettingBox then
        if not holdingBox then
            if not IsPedInAnyVehicle(player, false) then -- Check if player is not in a vehicle
                amountOfBox = deliveries
                TriggerServerEvent('sd-oxyrun:server:addItem', SupplierPosition, isOnRun)
                if currentBoxes < amountOfBox then
                    currentBoxes = currentBoxes + 1

                    exports['sd-objective']:UpdateProgress()

                    ShowNotification(''.. currentBoxes .. '/' .. amountOfBox .. '')

                    if currentBoxes == amountOfBox then
                        -- do something cool
                    end
                end
            end
        end
    end
end)

-- Call this when starting the box collection task
exports['sd-objective']:ShowObjectiveUI('Box Collection', 'Collect the boxes', amountOfBox)
```


