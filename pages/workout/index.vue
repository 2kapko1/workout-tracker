<template>
  <v-container>
    <v-btn block primary>start an empty workout</v-btn>
    <v-card>
      <v-card-title>Title<v-spacer/><v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn></v-card-title>
      <v-card-text>
      Last performed: 25 days ago
        <ul>
          <li>
            4 x Deadlift

          </li>
        </ul>

      </v-card-text>
    </v-card>

  </v-container>
</template>

<script>
export default {
  name: "WorkoutIndex",

}
</script>
