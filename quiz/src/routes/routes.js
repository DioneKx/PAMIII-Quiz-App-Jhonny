import { createStackNavigator } from '@react-navigation/stack'

import { Home } from '../pages/Home'
import { Quiz } from '../pages/Quiz'
import { Forms } from '../pages/Form'
import { Quiz10 } from '../pages/Quiz10'

const Stack = createStackNavigator()

export function StackRoutes() {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name={"Home"} component={Home} />
            <Stack.Screen name={"Quiz"} component={Quiz} />
            <Stack.Screen name={"Forms"} component={Forms} />
            <Stack.Screen name={"Quiz10"} component={Quiz10} />
        </Stack.Navigator>
    )
}