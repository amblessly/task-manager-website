import java.util.*;
import java.util.stream.Collectors;

/**
 * A simple Java-based backend for managing tasks.
 * This script simulates a REST-like interface for the Node.js proxy to interact with.
 */
public class TaskBackend {
    private static List<Map<String, String>> tasks = new ArrayList<>();

    static {
        // Initial seed data
        tasks.add(createTask("1", "Complete Project Proposal", "High"));
        tasks.add(createTask("2", "Review Java Backend Code", "Medium"));
        tasks.add(createTask("3", "Deploy to Vercel", "Low"));
    }

    private static Map<String, String> createTask(String id, String title, String priority) {
        Map<String, String> task = new HashMap<>();
        task.put("id", id);
        task.put("title", title);
        task.put("priority", priority);
        task.put("status", "Pending");
        return task;
    }

    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("Usage: java TaskBackend [list|add|delete] [params]");
            return;
        }

        String action = args[0];

        switch (action) {
            case "list":
                System.out.println(tasksToJson());
                break;
            case "add":
                if (args.length >= 3) {
                    tasks.add(createTask(UUID.randomUUID().toString(), args[1], args[2]));
                    System.out.println("Task added successfully");
                }
                break;
            case "delete":
                if (args.length >= 2) {
                    String id = args[1];
                    tasks.removeIf(t -> t.get("id").equals(id));
                    System.out.println("Task deleted successfully");
                }
                break;
            default:
                System.out.println("Unknown action: " + action);
        }
    }

    private static String tasksToJson() {
        return "[" + tasks.stream()
            .map(t -> String.format("{\"id\":\"%s\",\"title\":\"%s\",\"priority\":\"%s\",\"status\":\"%s\"}",
                t.get("id"), t.get("title"), t.get("priority"), t.get("status")))
            .collect(Collectors.joining(",")) + "]";
    }
}
