local isUIOpen = false
local currentProgress = 0
local totalSteps = 0

-- Function to show the UI
local function ShowObjectiveUI(title, description, steps)
    isUIOpen = true
    currentProgress = 0
    totalSteps = steps
    SendNUIMessage({
        type = 'objective',
        show = true,
        title = title,
        description = description,
        steps = steps
    })
end

-- Function to update progress
local function UpdateProgress()
    if isUIOpen and currentProgress < totalSteps then
        currentProgress = currentProgress + 1
        SendNUIMessage({
            type = 'progressUpdate'
        })

        if currentProgress == totalSteps then
            SetTimeout(2000, function()
                SendNUIMessage({
                    type = 'objective',
                    show = false
                })
                isUIOpen = false
            end)
        end
    end
end

-- Function to hide the UI
local function HideObjectiveUI()
    SendNUIMessage({
        type = 'objective',
        show = false
    })
end

-- Export the functions
exports('ShowObjectiveUI', ShowObjectiveUI)
exports('UpdateProgress', UpdateProgress)
exports('HideObjectiveUI', HideObjectiveUI)

-- Events that can be triggered from the server
RegisterNetEvent('sd-objective:client:showUI', function(title, description, steps)
    ShowObjectiveUI(title, description, steps)
end)

RegisterNetEvent('sd-objective:client:updateProgress', function()
    UpdateProgress()
end)

RegisterNetEvent('sd-objective:client:hideUI', function()
    HideObjectiveUI()
end)

-- Example usage with commands
RegisterCommand('testUI', function()
    ShowObjectiveUI('Gruppe 6 Contractor', 'Head to the location requesting a cash pickup.', 7)
end)

RegisterCommand('updateProgress', function()
    UpdateProgress()
end)