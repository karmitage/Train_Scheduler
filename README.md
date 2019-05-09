# Train_Scheduler

* The train scheduler allows the user to enter a train, destination, starting schedule, and frequency, which is stored in a firebase database. 

* The app stores train data and shows the user how many minutes remain until each train's arrival.

* I encountered an issue with this HW when I found that the first submission displayed all the values (train name, destination, frequency, start time) but subsequent form submissions did not appear to be capturing the form input values for destination and frequency. They did capture values for train name and time, however. I spent a lot of time trying various fixes, console logging outputs, using the debugger, etc. Finally I realized that the dynamic display elements for "destination" and "frequency" had the same ids as the form fields for those values. It worked the first time I entered form data because the dynamic elements didn't exist yet; however, once they existed, I wasn't able to assign the values for destination & frequency because (presumably) it was unclear which element I was referring to. I updated the dynamic display elements so they had unique ids, and the bug was fixed.

* It would have been much easier to debug if the Chrome inspector had thrown an error indicating there were multiple IDs with the same value - why doesn't it do this?